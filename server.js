const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017/job4all')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// สร้าง Schema สำหรับผู้ใช้
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // ใช้ username แทน name
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

// ลงทะเบียนผู้ใช้ใหม่
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // ตรวจสอบข้อมูลที่ส่งมาว่าครบถ้วนหรือไม่
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'โปรดกรอกข้อมูลให้ครบถ้วน' });
  }

  try {
    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' });
    }

    // เข้ารหัสรหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกข้อมูลผู้ใช้ใหม่
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'ลงทะเบียนผู้ใช้สำเร็จ' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดขณะลงทะเบียน โปรดลองใหม่อีกครั้ง.' });
  }
});

// ฟังก์ชันล็อกอิน
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // ตรวจสอบข้อมูลที่ส่งมาว่าครบถ้วนหรือไม่
  if (!username || !password) {
    return res.status(400).json({ error: 'โปรดกรอกข้อมูลให้ครบถ้วน' });
  }

  try {
    // ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await User.findOne({ username }); // ใช้ username ในการค้นหา
    if (!user) {
      return res.status(400).json({ error: 'ไม่พบผู้ใช้' });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
    }

    // ถ้ารหัสผ่านถูกต้อง ส่งข้อความว่าสำเร็จ
    res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดขณะเข้าสู่ระบบ โปรดลองใหม่อีกครั้ง.' });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
