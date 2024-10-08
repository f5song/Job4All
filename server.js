const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost:27017/job4all')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true }, 
  password: { type: String, required: true }, 
});

const User = mongoose.model('User', userSchema);

app.use(express.json());


app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;


  if (!username || !email || !password) {
    return res.status(400).json({ error: 'โปรดกรอกข้อมูลให้ครบถ้วน' });
  }

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'ผู้ใช้มีอยู่แล้ว' });
    }

    const newUser = new User({ name: username, email, password }); 
    await newUser.save();
    res.status(201).json({ message: 'ลงทะเบียนผู้ใช้สำเร็จ' });
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
