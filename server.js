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
  { collection: "job_listings", timestamps: true } // Added timestamps here
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

  if (userType === "บริษัท") {
    if (!companyName) {
      return res.status(400).json({ error: "โปรดกรอกชื่อบริษัท" });
    }
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
      firstName: userType === "ผู้หางาน" ? firstName : undefined,
      lastName: userType === "ผู้หางาน" ? lastName : undefined,
      companyName: userType === "บริษัท" ? companyName : undefined, // ตรวจสอบว่า companyName ถูกบันทึก
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

    // ตรวจสอบว่า companyName ถูกดึงมาถูกต้อง
    console.log("User from DB:", user); // ตรวจสอบข้อมูลผู้ใช้จากฐานข้อมูล

    const token = jwt.sign(
      { id: user._id, username: user.username, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "เข้าสู่ระบบสำเร็จ",
      token,
      userId: user._id,
      userType: user.userType,
      companyName: user.companyName, // ส่ง companyName กลับไป
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

app.get("/api/jobs_company/:company_name", async (req, res) => {
  const { company_name } = req.params;
  try {
    const jobs = await JobListing.find({ company_name }); // ตรวจสอบว่า field นี้ตรงกับชื่อในฐานข้อมูลหรือไม่
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

app.post("/api/jobs/add", async (req, res) => {
  try {
    const {
      job_title,
      job_location,
      job_salary,
      job_description,
      company_name,
      job_type,
      work_schedule,
      province,
    } = req.body;

    const newJob = new JobListing({
      job_title,
      job_location,
      job_salary,
      job_description,
      company_name,
      job_type,
      work_schedule,
      province,
    });

    await newJob.save();
    res.status(201).json({ message: "Job added successfully!" });
  } catch (error) {
    console.error("Error adding job:", error); // เพิ่มบรรทัดนี้เพื่อดูข้อผิดพลาดใน console
    res.status(500).json({ message: "Error adding job", error: error.message });
  }
});

const applicationSchema = new mongoose.Schema({
  user_id: String,
  job_id: String,
  status: String,
  firstName: String,
  lastName: String,
  phone: String,
  resume: String,
  applied_at: Date,
});

app.get("/api/applicants/job/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId; // รับ jobId จาก params
    const applicants = await Application.find({ job_id: jobId }); // ค้นหาผู้สมัครที่มี job_id ตรงกับ jobId

    if (applicants.length === 0) {
      return res.status(404).json({ message: "ไม่พบผู้สมัครสำหรับงานนี้" });
    }

    return res.json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});

// Route สำหรับการอัปเดตสถานะผู้สมัคร
app.put("/api/applicants/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // ตรวจสอบว่ารับสถานะที่ถูกต้อง
  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });
  }

  try {
    // ตรวจสอบว่ามีผู้สมัครที่ตรงตาม id ที่ส่งมา
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ error: "ไม่พบผู้สมัครที่ต้องการอัปเดต" });
    }

    // อัปเดตสถานะ
    application.status = status;
    await application.save(); // บันทึกการอัปเดต

    res.json(application);
  } catch (error) {
    console.error("Error updating application status:", error.message);
    res.status(500).send("เกิดข้อผิดพลาดในการอัปเดตผู้สมัคร");
  }
});

// Route สำหรับการสมัครงาน
app.post("/api/applications", upload.single("resume"), async (req, res) => {
  const { user_id, job_id, firstName, lastName, phone } = req.body;

  if (!user_id || !job_id || !firstName || !lastName || !phone || !req.file) {
    return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
  }

  try {
    const application = new Application({
      user_id,
      job_id,
      firstName,
      lastName,
      phone,
      resume: req.file.path,
    });

    await application.save();
    res.status(201).json({ message: "สมัครงานสำเร็จ", application });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
  }
});


// แก้ไขงานตาม jobId
app.put('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;

  // ตรวจสอบให้แน่ใจว่า id เป็น ID ที่ถูกต้อง
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID ที่ส่งมาไม่ถูกต้อง" });
  }

  try {
    // ค้นหางานและอัปเดตข้อมูล
    const updatedJob = await JobListing.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // ตรวจสอบให้แน่ใจว่าข้อมูลที่ส่งเข้ามาถูกต้องตาม schema
    });

    // ตรวจสอบว่าพบงานที่ต้องการอัปเดตหรือไม่
    if (!updatedJob) {
      return res.status(404).json({ message: 'ไม่พบงานที่ต้องการอัปเดต' });
    }

    // ส่งข้อมูลงานที่อัปเดตกลับไป
    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลงาน" });
  }
});



// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
