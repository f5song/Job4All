require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors"); // นำเข้า cors ที่นี่
const bodyParser = require("body-parser"); // เพิ่มการนำเข้า body-parser
const app = express();

// เชื่อมต่อ MongoDB
mongoose
  .connect("mongodb://localhost:27017/job4all", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// สร้าง Schema สำหรับผู้ใช้
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  disability_type: String,
  location: {
    city: String,
    country: String,
  },
  firstName: { type: String },
  lastName: { type: String },
  companyName: { type: String },
});

const User = mongoose.model("User", userSchema);

// สร้าง Schema สำหรับ job listings
const jobListingSchema = new mongoose.Schema(
  {
    job_title: { type: String, required: true },
    job_location: { type: String, required: true },
    job_salary: { type: String, required: true },
    job_description: { type: String, required: true },
    company_name: { type: String, required: true },
    province: { type: String, required: true },
    job_type: { type: String },
    work_schedule: { type: String },
  },
  { collection: "job_listings" }
);

const JobListing = mongoose.model("JobListing", jobListingSchema);

// Middleware สำหรับการ parse JSON และใช้งาน CORS
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // เพิ่มบรรทัดนี้เพื่อใช้ body-parser

// Route สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
app.get("/data", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route สำหรับดึงข้อมูลผู้ใช้ตาม ID
app.get("/api/users/id/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID ที่ส่งมาไม่ถูกต้อง" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "ไม่พบผู้ใช้" });
    }

    res.json({ firstName: user.firstName, lastName: user.lastName });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
      details: error.message,
    });
  }
});

// Middleware สำหรับการตรวจสอบ JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/api/protected", authenticateJWT, (req, res) => {
  res.send("คุณได้เข้าถึงข้อมูลที่ต้องการการยืนยันตัวตน");
});

// Route สำหรับค้นหางานพร้อมฟิลเตอร์
app.get("/api/jobs", async (req, res) => {
  const { search, job_type, work_schedule, province } = req.query;

  const filter = {};

  if (search) {
    filter.job_title = { $regex: search, $options: "i" };
  }
  if (job_type) {
    filter.job_type = job_type;
  }
  if (work_schedule) {
    filter.work_schedule = work_schedule;
  }
  if (province) {
    filter.province = province;
  }

  try {
    const jobs = await JobListing.find(filter);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลงาน" });
  }
});

// Route สำหรับดึงข้อมูลงานตาม ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await JobListing.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "ไม่พบงานที่ต้องการ" });
    }
    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลงาน" });
  }
});

// Route สำหรับการลงทะเบียนผู้ใช้ใหม่
app.post("/api/register", async (req, res) => {
  const {
    username,
    email,
    password,
    userType,
    firstName,
    lastName,
    companyName,
  } = req.body;

  if (!username || !email || !password || !userType) {
    return res.status(400).json({ error: "โปรดกรอกข้อมูลให้ครบถ้วน" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "รูปแบบอีเมลไม่ถูกต้อง" });
  }

  try {
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: "อีเมลนี้ถูกใช้งานแล้ว" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ error: "ชื่อผู้ใช้นี้มีอยู่แล้ว" });
    }

    if (userType === "ผู้หางาน") {
      if (!firstName || !lastName) {
        return res.status(400).json({ error: "โปรดกรอกชื่อจริงและนามสกุล" });
      }
    } else if (userType === "บริษัท") {
      if (!companyName) {
        return res.status(400).json({ error: "โปรดกรอกชื่อบริษัท" });
      }
    } else {
      return res.status(400).json({ error: "ประเภทผู้ใช้ไม่ถูกต้อง" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
      firstName: userType === "ผู้หางาน" ? firstName : undefined,
      lastName: userType === "ผู้หางาน" ? lastName : undefined,
      companyName: userType === "บริษัท" ? companyName : undefined,
    });
    await newUser.save();

    res.status(201).json({ message: "ลงทะเบียนผู้ใช้สำเร็จ" });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ error: "เกิดข้อผิดพลาดขณะลงทะเบียน โปรดลองใหม่อีกครั้ง." });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "โปรดกรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "ไม่พบผู้ใช้" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "รหัสผ่านไม่ถูกต้อง" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ส่ง userId กลับไปใน response
    console.log("User ID:", user._id); // เพิ่มคำสั่งนี้เพื่อดูค่า userId
    res.status(200).json({
      message: "เข้าสู่ระบบสำเร็จ",
      token,
      userId: user._id, // เพิ่ม userId ที่นี่
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ error: "เกิดข้อผิดพลาดขณะเข้าสู่ระบบ โปรดลองใหม่อีกครั้ง." });
  }
});

// Schema สำหรับการสมัครงาน
const ApplicationSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    job_id: { type: String, required: true },
    status: { type: String, default: "pending" },
    applied_at: { type: Date, default: Date.now },
    firstName: { type: String, required: true }, // เพิ่มฟิลด์ firstName
    lastName: { type: String, required: true }, // เพิ่มฟิลด์ lastName
    phone: { type: String, required: true }, // เพิ่มฟิลด์ phone
    resume: { type: String, required: true }, // ฟิลด์ที่ใช้เก็บที่อยู่ของไฟล์เรซูเม่
  },
  { collection: "applications" }
);
const Application = mongoose.model("Application", ApplicationSchema);

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // เก็บไฟล์ในโฟลเดอร์ uploads

app.post("/api/applications", upload.single("resume"), async (req, res) => {
  const { user_id, job_id, status, firstName, lastName, phone } = req.body;

  // ตรวจสอบข้อมูล
  if (
    !user_id ||
    !job_id ||
    !status ||
    !firstName ||
    !lastName ||
    !phone ||
    !req.file
  ) {
    return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
  }

  try {
    const application = new Application({
      user_id,
      job_id,
      status,
      firstName,
      lastName,
      phone,
      resume: req.file.path, // บันทึกที่อยู่ของไฟล์เรซูเม่
    });

    await application.save();
    res.status(201).json({ message: "สมัครงานสำเร็จ", application });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
  }
});

// ฟังค์ชั่นเริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
