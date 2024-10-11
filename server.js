const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/job4all', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// สร้าง Schema สำหรับผู้ใช้
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  disability_type: String,
  skills: [String],
  location: {
    city: String,
    country: String,
  },
});

const User = mongoose.model('User', userSchema);

// สร้าง Schema สำหรับ job listings
const jobListingSchema = new mongoose.Schema({
  job_title: { type: String, required: true },
  job_location: { type: String, required: true },
  job_salary: { type: String, required: true },
  job_description: { type: String, required: true },
  company_name: { type: String, required: true },
  province: { type: String, required: true },
  job_type: { type: String },
  work_schedule: { type: String },
}, { collection: 'job_listings' });

const JobListing = mongoose.model('JobListing', jobListingSchema);

// Middleware สำหรับการ parse JSON
app.use(express.json());

// Route สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/data', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route สำหรับค้นหางานพร้อมฟิลเตอร์
app.get('/api/jobs', async (req, res) => {
  const { search, job_type, work_schedule, province } = req.query;

  const filter = {};

  if (search) {
    filter.job_title = { $regex: search, $options: 'i' };
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
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลงาน' });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    console.log('Fetching job with ID:', req.params.id); // เพิ่ม log เพื่อดูว่า id ที่ส่งมาถูกต้องไหม
    const job = await JobListing.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'ไม่พบงานที่ต้องการ' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลงาน' });
  }
});

// Route สำหรับการลงทะเบียนผู้ใช้ใหม่
app.post('/api/register', async (req, res) => {
  const { username, email, password, userType } = req.body;

  // ตรวจสอบว่าใส่ข้อมูลครบถ้วน
  if (!username || !email || !password || !userType) {
    return res.status(400).json({ error: 'โปรดกรอกข้อมูลให้ครบถ้วน' });
  }

  // ตรวจสอบรูปแบบอีเมล
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'รูปแบบอีเมลไม่ถูกต้อง' });
  }

  try {
    // ตรวจสอบความซ้ำซ้อนของผู้ใช้
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, userType });
    await newUser.save();

    res.status(201).json({ message: 'ลงทะเบียนผู้ใช้สำเร็จ' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดขณะลงทะเบียน โปรดลองใหม่อีกครั้ง.' });
  }
});

// Route สำหรับเข้าสู่ระบบ
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // ตรวจสอบว่าใส่ข้อมูลครบถ้วน
  if (!username || !password) {
    return res.status(400).json({ error: 'โปรดกรอกข้อมูลให้ครบถ้วน' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'ไม่พบผู้ใช้' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
    }

    res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดขณะเข้าสู่ระบบ โปรดลองใหม่อีกครั้ง.' });
  }
});

// เปิดใช้งาน server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
