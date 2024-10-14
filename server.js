require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors"); 
const bodyParser = require("body-parser"); 
const app = express();


mongoose
  .connect("mongodb://localhost:27017/job4all", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));


  const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    companyName: { type: String },
    disabilityType: { type: String }, // Ensure this field exists
  });

const User = mongoose.model("User", userSchema);


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
  { collection: "job_listings", timestamps: true } 
);

const JobListing = mongoose.model("JobListing", jobListingSchema);


app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 


app.get("/data", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get("/api/users/id/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID ที่ส่งมาไม่ถูกต้อง" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "ไม่พบผู้ใช้" });
    }

    res.json({ 
      firstName: user.firstName, 
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      address: user.address,
      disability_type: user.disabilityType, // Change this line
      resume: user.resume // Include resume if needed
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
      details: error.message,
    });
  }
});



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


app.post("/api/register", async (req, res) => {
  const {
    username,
    email,
    password,
    userType,
    firstName,
    lastName,
    companyName,
    disabilityType, // Extracting disabilityType
  } = req.body;
  console.log("Received disabilityType:", disabilityType); // Debugging

  // Check for required fields
  if (!username || !email || !password || !userType) {
    return res.status(400).json({ error: "โปรดกรอกข้อมูลให้ครบถ้วน" });
  }

  if (userType === "บริษัท") {
    if (!companyName) {
      return res.status(400).json({ error: "โปรดกรอกชื่อบริษัท" });
    }
  } else if (userType === "ผู้หางาน") {
    if (!disabilityType) { // This check is for job seekers
      return res.status(400).json({ error: "โปรดเลือกประเภทความพิการ" });
    }
  }

  try {
    // Check for existing users by email and username
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: "อีเมลนี้ถูกใช้งานแล้ว" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ error: "ชื่อผู้ใช้นี้มีอยู่แล้ว" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the disability type
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
      firstName: userType === "ผู้หางาน" ? firstName : undefined,
      lastName: userType === "ผู้หางาน" ? lastName : undefined,
      companyName: userType === "บริษัท" ? companyName : undefined,
      disabilityType: userType === "ผู้หางาน" ? disabilityType : undefined, // Add disabilityType for job seekers
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

    console.log("User from DB:", user); 

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
      companyName: user.companyName, 
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ error: "เกิดข้อผิดพลาดขณะเข้าสู่ระบบ โปรดลองใหม่อีกครั้ง." });
  }
});


const ApplicationSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    job_id: { type: String, required: true },
    status: { type: String, default: "pending" },
    applied_at: { type: Date, default: Date.now },
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    resume: { type: String, required: true }, 
  },
  { collection: "applications" }
);
const Application = mongoose.model("Application", ApplicationSchema);

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // เก็บไฟล์ในโฟลเดอร์ uploads

app.post("/api/applications", upload.single("resume"), async (req, res) => {
  const { user_id, job_id, status, firstName, lastName, phone } = req.body;

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
      resume: req.file.path, 
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
    const jobs = await JobListing.find({ company_name }); 
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
    console.error("Error adding job:", error); 
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
    const jobId = req.params.jobId; 
    const applicants = await Application.find({ job_id: jobId }); 

    if (applicants.length === 0) {
      return res.status(404).json({ message: "ไม่พบผู้สมัครสำหรับงานนี้" });
    }

    return res.json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});


app.put("/api/applicants/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;


  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });
  }

  try {
    
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ error: "ไม่พบผู้สมัครที่ต้องการอัปเดต" });
    }


    application.status = status;
    await application.save(); 

    res.json(application);
  } catch (error) {
    console.error("Error updating application status:", error.message);
    res.status(500).send("เกิดข้อผิดพลาดในการอัปเดตผู้สมัคร");
  }
});


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



app.put('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;

  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID ที่ส่งมาไม่ถูกต้อง" });
  }

  try {

    const updatedJob = await JobListing.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, 
    });

    if (!updatedJob) {
      return res.status(404).json({ message: 'ไม่พบงานที่ต้องการอัปเดต' });
    }

    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลงาน" });
  }
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
