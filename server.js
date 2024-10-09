const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();


mongoose.connect('mongodb://localhost:27017/job4all')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    userType: { type: String, required: true } // เพิ่ม userType
});
const User = mongoose.model('User', userSchema);

app.use(express.json());


app.post('/api/register', async (req, res) => {
  const { username, email, password, userType } = req.body;

  if (!username || !email || !password || !userType) { // ตรวจสอบ userType
      return res.status(400).json({ error: 'โปรดกรอกข้อมูลให้ครบถ้วน' });
  }

  try {
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
          return res.status(400).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' });
      }

      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
          return res.status(400).json({ error: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword, userType }); // บันทึก userType
      await newUser.save();
      
      res.status(201).json({ message: 'ลงทะเบียนผู้ใช้สำเร็จ' });
  } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดขณะลงทะเบียน โปรดลองใหม่อีกครั้ง.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
