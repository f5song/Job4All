const express = require('express');
const mongoose = require('mongoose');
const app = express();

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017/job4all')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// สร้าง Schema และ Model สำหรับ users collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  user_type: String,
  disability_type: String,
  skills: [String], // ใช้เป็น array ของ string
  location: {
    city: String,
    country: String,
  },
});

const User = mongoose.model('User', userSchema);

// สร้าง API ที่จะให้ React Native เรียกใช้งาน
app.get('/data', async (req, res) => {
  try {
      const users = await User.find(); // ใช้โมเดลที่คุณสร้าง
      res.json({ users }); // ส่งข้อมูลผู้ใช้กลับ
  } catch (error) {
      res.status(500).send(error.message);
  }
});


// เริ่มเซิร์ฟเวอร์ที่ port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
