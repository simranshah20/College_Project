const express = require('express');
const app = express();

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const env = dotenv.config();

const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());

const studentModel = require('./Models/studentmodel');
const teacherModel = require('./Models/teacherModel');
const signupRoutes = require('./Routes/signupRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const profileRoutes = require('./Routes/profileRoutes');
const projectsRoutes = require('./Routes/projectsRoutes');
const forgetPasswordRoutes = require('./Routes/forgetPasswordRoutes');
const resetPasswordRoutes = require('./Routes/resetPasswordRoutes');
const teacherProfileRoutes = require('./Routes/teacherProfileRoutes')
const path = require('path')
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, '../Frontend/public/images')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));




const jwt = require('jsonwebtoken');
// const teacherModel = require('./Models/teacherModel');
// const { default: ResetPassword } = require('');


// Connect to MongoDB
mongoose
  .connect(process.env.database_url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use("/api", signupRoutes);
app.use("/api", loginRoutes);
app.use("/api", profileRoutes);
app.use("/api", projectsRoutes);
app.use("/api", forgetPasswordRoutes);
app.use("/api",resetPasswordRoutes);
app.use("/api",teacherProfileRoutes);


app.get('/verify', async (req, res) => {
  const { token } = req.query;
   const {role} = req.query;
  try {
    console.log("Verify Route2");
    let userIDMatchWithToken;
    let user;
    if(role == "student"){
      userIDMatchWithToken = await studentModel.findOne({ verificationToken: token });
    user = await studentModel.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true, verificationToken: null },
      { new: true }
    );
    }else{
      userIDMatchWithToken = await teacherModel.findOne({ verificationToken: token });
      user = await teacherModel.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true, verificationToken: null },
      { new: true }
    );
    }
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    return res.redirect(`http://localhost:5173/SignUp?id=${userIDMatchWithToken._id}&role=${role}`);
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(400).json({ error: 'Verification failed' });
  }
});

app.get('/api/student/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await studentModel.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    console.log(student);
    res.status(200).json({
      name: student.name,
      email: student.email,
      contact: student.contact,
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Error fetching student' });
  }
});

//teacher
app.get('/api/teacher/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await teacherModel.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    console.log(teacher);
    res.status(200).json({
      name: teacher.name,
      email: teacher.email,
      contact: teacher.contact,
    });
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ error: 'Error fetching teacher' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
