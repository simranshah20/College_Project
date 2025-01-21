// const studentMoreInfo= require("../Models/studentMoreInfo");
const teacherMoreInfo = require("../Models/teacherMoreInfo");

const getTeacherProfileInfo = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const moreInfo = await teacherMoreInfo.findOne({ studentID: teacherId });
    console.log("Before moreInfo", moreInfo);
    if (!moreInfo) {
      return res.status(404).json({ success: false, message: "Profile info not matched from the database." });
    }

    // if (!moreInfo.image) {
    //   moreInfo.image = "/uploads/default_image.jpg";
    // }

    // Convert domain to array if it's a string
    // if (typeof moreInfo.domain === "string") {
    //   moreInfo.domain = moreInfo.domain.split(",").map((item) => item.trim());
    // }
    console.log("After", moreInfo);
    res.status(200).json({ success: true, moreInfo });  
  } catch (error) {
    console.error("Error in getProfileInfo:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the profile info from the db.",
      error: error.message,
    });
  }
};





const createTeacherProfileInfo = async (req, res) => {
  console.log("Request Body:", req.body);
//console.log("Uploaded File:", req.file)
const {teacherId}=req.params;
  const {name,Bio, github,linkedin,twitter,location,domain,image}=req.body
  try {
      const profile = new teacherMoreInfo({
        name,
    Bio,
    github,
    // instagram,
    linkedin,
    twitter,
    // leetcode,
    // projects ,
    // skills,
    domain: Array.isArray(domain) ? domain : [],
    location,
    // branch,
    // selectYear,
    studentID:teacherId,
    image
    })

    await profile.save();
    console.log("After Saving",profile)
  res.json({success:true,message:"Profile info saved in the db successfully.",profile})
  } catch (error) {
    console.error("Error in saving profile in the database:", error.message);
      res.json({ success: false, message: "Error" })
  }
}

const getTeacherProfileImage=async(req,res)=>{
try{
  console.log("backend teacher image")
  const {teacherId}=req.params
const imagePath = `/uploads/${req.file.filename}`;
console.log("image path",imagePath)
await teacherMoreInfo.findOneAndUpdate({ studentID: teacherId }, { image: imagePath });
  res.json({ success: true, image: imagePath })
}
catch(error){
res.status(500).json({ success: false, message: "Error uploading image.", error: error.message });
}
}

module.exports={createTeacherProfileInfo,getTeacherProfileInfo,getTeacherProfileImage}