const studentModel = require("../Models/studentmodel");
const sendVerificationMail = require('../Utils/sendVerificationMail');
const crypto = require('crypto');

const signupController=async (req,res)=>{
  const {email,name,password,contact}=req.body
  console.log("Received data:",name,email,contact);
  try {
    // Generate a unique token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create a new user
    const user = new studentModel({
      name,
      email,
      contact,
      password,
      verificationToken,
  });
  
  const savedUser = await user.save();
  console.log(savedUser)

    // Send the verification email
    const emailSent = await sendVerificationMail(email, verificationToken);

    if (emailSent) {
        res.status(201).json({ message: 'User created. Verification email sent!' });
        console.log('User created. Verification email sent!')
    } else {
        res.status(500).json({ message: 'User created, but email not sent. Try again.' });
        console.log(" 'User created, but email not sent. Try again.' ")
    }
} catch (error) {
    console.error('Error during signup:', error);
    res.status(400).json({ error: 'Error creating user' });
}

}

module.exports={signupController}
