// import React, { useEffect, useState } from 'react'
// import axios from "axios"
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Select from "react-select"; // Install via npm install react-select

// const TeacherProfile = () => {
//   const [isEditing, setIsEditing] = useState(false); // NEW STATE

//   const domainOptions = [
//     { value: "Web Development", label: "Web Development" },
//     { value: "Data Science", label: "Data Science" },
//     { value: "Machine Learning", label: "Machine Learning" },
//     { value: "App Development", label: "App Development" },
//     { value: "UI/UX Design", label: "UI/UX Design" },
//   ];
//   const handleDomainChange = (selectedOptions) => {
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       domain: selectedOptions.map((option) => option.value),
//     }));
//   };

//   const id = localStorage.getItem('userId') || "defaultID";

//   const [teacherName, setTeacherName] = useState('');
//   const [teacherEmail, setTeacherEmail] = useState('');
//   const [teacherContact, setTeacherContact] = useState('');
//   const [profile, setProfile] = useState({
//     name: "",
//     Bio: "",
//     github: "",
//     // instagram: "",
//     linkedin: "",
//     twitter: "",
//     // leetcode: "",
//     // projects: "",
//     // skills: "",
//     domain: '',
//     location: "",
//     // branch: "",
//     // selectYear: "",
//     image: "/images/default_image.jpg"
//   });

//   const fetchTeacherName = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3002/api/teacher/${id}`);
//       setTeacherName(response.data.name);
//       setTeacherEmail(response.data.email);
//       setTeacherContact(response.data.contact);
//       setProfile(prevProfile => ({
//         ...prevProfile,
//         name: response.data.name
//       }));
//     } catch (error) {
//       console.error('Error fetching student name:', error);
//     }
//   };

//   const fetchTeacherProfileInfo = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3002/api/teacherProfile/${id}`);
//       if (response.data.success) {
//         const fetchedProfile = response.data.moreInfo;
//         setProfile(prevProfile => ({
//           ...prevProfile,
//           ...fetchedProfile
//         }));
//       }
//     } catch (error) {
//       console.error("Error in fetching profile info:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`http://localhost:3002/api/teacherProfile/${id}`, profile);
//       toast.success('Profile info saved in the database successfully.', {
//         style: { color: "#ff5722" }
//       });
//        // Emit custom event
//        const event = new Event("profileUpdated");
//        window.dispatchEvent(event); // Dispatch the event globally
//       setIsEditing(false); // Exit edit mode after saving
//     } catch (error) {
//       console.error("Error saving profile info in the database:", error);
//       toast.error("Failed to save profile info in the database");
//     }
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       console.log("Teacher image");
//       const response = await axios.post(`http://localhost:3002/api/teacherProfile/${id}/uploadImage`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("teacher image path",response.data.image)
//       setProfile(prevProfile => ({ ...prevProfile, image: response.data.image }));
//       toast.success("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast.error("Failed to upload image.");
//     }
//   };

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       backgroundColor: "#374151",
//       color: "#FFFFFF",
//       border: "2px solid rgb(80, 158, 179)",
//       borderRadius: "10px",
//       boxShadow: "none",
//       padding: "10px"
//     }),
//     menu: (base) => ({
//       ...base,
//       backgroundColor: "#71717A",
//       color: "#FFFFFF",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused ? "#374151" : "#1F2937",
//       color: "#FFFFFF",
//       "&:active": {
//         backgroundColor: "#4B5563",
//       },
//     }),
//     multiValue: (base) => ({
//       ...base,
//       backgroundColor: "#71717A",
//       color: "#FFFFFF",
//       borderRadius: "0.375rem",
//     }),
//     multiValueLabel: (base) => ({
//       ...base,
//       color: "#FFFFFF",
//     }),
//     multiValueRemove: (base) => ({
//       ...base,
//       color: "#FFFFFF",
//       "&:hover": {
//         backgroundColor: "#4B5563",
//         color: "#FFFFFF",
//       },
//     }),
//   };

//   useEffect(() => {
//     fetchTeacherName();
//     fetchTeacherProfileInfo();
//   }, [id]);

//   return (
//     <>
//       <form onSubmit={handleSave}>
//         <ToastContainer />
//         <div className='profile-container p-5 bg-zinc-700 flex'>
//           <div className='left-profile p-3 mt-10'>
//             <h4 className="student-name">
//               {teacherName ? `Welcome, ${teacherName}` : "Loading..."}
//             </h4>
//             <div className='flex items-center justify-center mt-3 mb-3'>
//               {/* <img
//                 src={profile.image.startsWith("/uploads/")
//                   ? `http://localhost:20000${profile.image}`
//                   : `http://localhost:20000/images/default_image.jpg`}
//                 alt="Profile"
//                 className="profile-image object-contain rounded-lg"
//                 onClick={() => document.getElementById("imageUpload").click()}
//                 style={{ width: "180px", height: "180px", cursor: "pointer" }}
          
//               />
//               <input
//                 type="file"
//                 id="imageUpload"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
                
//               /> */}
//               <img
//   src={profile.image.startsWith("/uploads/")
//     ? `http://localhost:3002${profile.image}`
//     : `http://localhost:3002/images/default_image.jpg`}
//   alt="Profile"
//   className="profile-image object-contain rounded-lg"
//   onClick={() => isEditing && document.getElementById("imageUpload").click()} // Prevent click if not editing
//   // onClick={() => document.getElementById("imageUpload").click()} // Prevent click if not editing
//   style={{ width: "180px", height: "180px", cursor: isEditing ? "pointer" : "default" }}
//   // style={{ width: "180px", height: "180px", cursor: "pointer" }}
// />
// <input
//   type="file"
//   id="imageUpload"
//   style={{ display: "none" }}
//   onChange={handleImageChange}
//   disabled={!isEditing} // Disable file input if not in editing mode
// />

//             </div>
//             <div className='flex flex-col gap-3'>
//               <input
//                 type="email"
//                 className="input-links bg-zinc-500"
//                 value={teacherEmail}
//                 placeholder="KIIT mail"
//               />
//               <input
//                 className="input-links bg-zinc-500"
//                 type="text"
//                 placeholder='Location'
//                 onChange={handleChange}
//                 required
//                 name="location"
//                 value={profile.location}
//                 disabled={!isEditing} // DISABLE BASED ON isEditing
//               />
//               <input
//                 type="tel"
//                 className="input-links bg-zinc-500"
//                 value={teacherContact}
//                 placeholder="Contact"
//               />
//               {/* <input
//                 type="text"
//                 className="input-links bg-zinc-500"
//                 placeholder='Branch'
//                 onChange={handleChange}
//                 required
//                 name="branch"
//                 value={profile.branch}
//                 disabled={!isEditing} // DISABLE BASED ON isEditing
//               /> */}
//               {/* <select
//                 value={profile.selectYear}
//                 onChange={handleChange}
//                 name="selectYear"
//                 id="year"
//                 required
//                 className="input-links bg-zinc-500"
//                 disabled={!isEditing} // DISABLE BASED ON isEditing
//               >
//                 <option value="">Select Year</option>
//                 <option value="1st year">1st Year</option>
//                 <option value="2nd year">2nd Year</option>
//                 <option value="3rd year">3rd Year</option>
//                 <option value="4th year">4th Year</option>
//               </select> */}
//             </div>
//           </div>

//           <div className='bg-zinc-500 border-2 rounded-md outline-none w-full right-profile-info p-5'>
//             <h1 className='text-3xl text-start mb-3'>Write short bio</h1>
//             <textarea
//               className='outline-none bg-zinc-700 w-full border-2 rounded-md'
//               onChange={handleChange}
//               name="Bio"
//               value={profile.Bio}
//               required
//               disabled={!isEditing} // DISABLE BASED ON isEditing
//             ></textarea>
//             <h1 className='text-2xl text-start mt-3 mb-2'>Social media links</h1>
//             <div className='border-blue-300 flex flex-row bg-zinc-700 p-5 border-2 rounded-md outline-none'>
//               <div className='space-y-5 ml-20'>
//                 <input
//                   placeholder='Github Link'
//                   className="input-links bg-zinc-500"
//                   name="github"
//                   onChange={handleChange}
//                   value={profile.github}
//                   disabled={!isEditing} // DISABLE BASED ON isEditing
//                 />
//                 <input
//                   placeholder="LinkedIn Link"
//                   className="input-links bg-zinc-500"
//                   name="linkedin"
//                   onChange={handleChange}
//                   value={profile.linkedin}
//                   disabled={!isEditing} // DISABLE BASED ON isEditing
//                 />
//                 {/* <input
//                   placeholder="Leetcode Link"
//                   className="input-links bg-zinc-500"
//                   onChange={handleChange}
//                   name="leetcode"
//                   value={profile.leetcode}
//                   disabled={!isEditing} // DISABLE BASED ON isEditing
//                 /> */}
//               </div>
//                <div className='space-y-5 me-20'>
//                {/* <input
//                   placeholder="Instagram Link"
//                   onChange={handleChange}
//                   className="bg-zinc-500 input-links"
//                   name="instagram"
//                   value={profile.instagram}
//                   disabled={!isEditing} // DISABLE BASED ON isEditing
//                 />*/}
//                 <input
//                   placeholder="Twitter Link"
//                   onChange={handleChange}
//                   className="bg-zinc-500 input-links"
//                   name="twitter"
//                   value={profile.twitter}
//                   disabled={!isEditing} // DISABLE BASED ON isEditing
//                 />
//               </div> 
//             </div>
//             {/* <div>
//               <h1 className='text-2xl text-start mt-3 mb-2'>Ongoing Projects</h1>
//               <textarea
//                 className='outline-none bg-zinc-700 w-full border-2 rounded-md'
//                 onChange={handleChange}
//                 name="projects"
//                 value={profile.projects}
//                 disabled={!isEditing} // DISABLE BASED ON isEditing
//               ></textarea>
//             </div> */}
//             {/* <h1 className='text-2xl text-start mt-3 mb-2'>Skills</h1>
//             <div>
//               <textarea
//                 onChange={handleChange}
//                 className='bg-zinc-700 outline-none w-full border-2 rounded-md'
//                 name="skills"
//                 value={profile.skills}
//                 required
//                 disabled={!isEditing} // DISABLE BASED ON isEditing
//               ></textarea>
//             </div> */}
//             <h1 className='text-2xl text-start mt-3 mb-2'>Domain</h1>
//             <div>
//               <Select
//                 isMulti
//                 options={domainOptions}
//                 value={domainOptions.filter((option) =>
//                   profile.domain.includes(option.value)
//                 )}
//                 onChange={handleDomainChange}
//                 styles={customStyles}
//                 isDisabled={!isEditing} // DISABLE BASED ON isEditing
//               />
//             </div>
//           </div>
//         </div>
//         <div className='flex justify-center mt-5'>
//           <button
//             type="button"
//             className='text-center px-5 py-2 bg-green-500 rounded-lg mr-3'
//             onClick={() => setIsEditing(true)} // ENABLE EDIT MODE
//           >
//             Edit
//           </button>
//           <button
//             type="submit"
//             className='text-center px-5 py-2 bg-blue-500 rounded-lg'
//             disabled={!isEditing} // DISABLE IF NOT EDITING
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default TeacherProfile;



import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select"; // Install via npm install react-select

const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // NEW STATE

  const domainOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "App Development", label: "App Development" },
    { value: "UI/UX Design", label: "UI/UX Design" },
  ];




  // Subdomains for each domain
  const subdomainOptions = {
    "Web Development": [
      { value: "Frontend Development", label: "Frontend Development" },
      { value: "Backend Development", label: "Backend Development" },
      { value: "Full Stack", label: "Full Stack" },
    ],
    "Data Science": [
      { value: "Machine Learning", label: "Machine Learning" },
      { value: "Data Analysis", label: "Data Analysis" },
      { value: "Data Visualization", label: "Data Visualization" },
    ],
    "Machine Learning": [
      { value: "Deep Learning", label: "Deep Learning" },
      { value: "NLP", label: "Natural Language Processing" },
      { value: "Reinforcement Learning", label: "Reinforcement Learning" },
    ],
    "App Development": [
      { value: "Android Development", label: "Android Development" },
      { value: "iOS Development", label: "iOS Development" },
      { value: "Cross Platform", label: "Cross Platform" },
    ],
    "UI/UX Design": [
      { value: "UX Research", label: "UX Research" },
      { value: "UI Design", label: "UI Design" },
      { value: "Interaction Design", label: "Interaction Design" },
    ],
  };

  const handleDomainChange = (selectedOptions) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      domain: selectedOptions.map((option) => option.value),
      subdomain: [],
    }));
  };


  // Handle subdomain change
  const handleSubdomainChange = (selectedOptions) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      subdomain: selectedOptions.map((option) => option.value),
    }));
  };

  const teacherId= localStorage.getItem('teacherId') || "defaultID";
  console.log(teacherId)

  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherContact, setTeacherContact] = useState('');
  const [profile, setProfile] = useState({
    name: "",
    Bio: "",
    github: "",
    // instagram: "",
    linkedin: "",
    twitter: "",
    // leetcode: "",
    // projects: "",
    // skills: "",
    domain: [],
    subdomain:[],
    location: "",
    // branch: "",
    // selectYear: "",
    image: "/images/default_image.jpg"
  });

  const fetchTeacherName = async () => {
    try {
      console.log("FetchTeacherName")
      const response = await axios.get(`http://localhost:3002/api/teacher/${teacherId}`);
      setTeacherName(response.data.name);
      setTeacherEmail(response.data.email);
      setTeacherContact(response.data.contact);
      setProfile(prevProfile => ({
        ...prevProfile,
        name: response.data.name
      }));
    } catch (error) {
      console.error('Error fetching student name:', error);
    }
  };

  const fetchTeacherProfileInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/teacherProfile/${teacherId}`);
      if (response.data.success) {
        const fetchedProfile = response.data.moreInfo;
        setProfile(prevProfile => ({
          ...prevProfile,
          ...fetchedProfile
        }));
      }
    } catch (error) {
      console.error("Error in fetching profile info:", error);
    }
  };
  useEffect(() => {
    fetchTeacherName();
    fetchTeacherProfileInfo();
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3002/api/teacherProfile/${teacherId}`, profile);
      toast.success('Profile info saved in the database successfully.', {
        style: { color: "#ff5722" }
      });
       // Emit custom event
       const event = new Event("profileUpdated");
       window.dispatchEvent(event); // Dispatch the event globally
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error saving profile info in the database:", error);
      toast.error("Failed to save profile info in the database");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      console.log("Teacher image");
      const response = await axios.post(`http://localhost:3002/api/teacherProfile/${teacherId}/uploadImage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("teacher image path",response.data.image)
      setProfile(prevProfile => ({ ...prevProfile, image: response.data.image }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#374151",
      color: "#FFFFFF",
      border: "2px solid rgb(80, 158, 179)",
      borderRadius: "10px",
      boxShadow: "none",
      padding: "10px"
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#71717A",
      color: "#FFFFFF",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#374151" : "#1F2937",
      color: "#FFFFFF",
      "&:active": {
        backgroundColor: "#4B5563",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#71717A",
      color: "#FFFFFF",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#FFFFFF",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#4B5563",
        color: "#FFFFFF",
      },
    }),
  };



  return (
    <>
      <form onSubmit={handleSave}>
        <ToastContainer />
        <div className='profile-container p-5 bg-zinc-700 flex'>
          <div className='left-profile p-3 mt-10'>
            <h4 className="student-name">
              {teacherName ? `Welcome, ${teacherName}` : "Loading..."}
            </h4>
            <div className='flex items-center justify-center mt-3 mb-3'>
              {/* <img
                src={profile.image.startsWith("/uploads/")
                  ? `http://localhost:20000${profile.image}`
                  : `http://localhost:20000/images/default_image.jpg`}
                alt="Profile"
                className="profile-image object-contain rounded-lg"
                onClick={() => document.getElementById("imageUpload").click()}
                style={{ width: "180px", height: "180px", cursor: "pointer" }}
          
              />
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={handleImageChange}
                
              /> */}
              <img
  src={profile.image.startsWith("/uploads/")
    ? `http://localhost:3002${profile.image}`
    : `http://localhost:3002/images/default_image.jpg`}
  alt="Profile"
  className="profile-image object-contain rounded-lg"
  onClick={() => isEditing && document.getElementById("imageUpload").click()} // Prevent click if not editing
  // onClick={() => document.getElementById("imageUpload").click()} // Prevent click if not editing
  style={{ width: "180px", height: "180px", cursor: isEditing ? "pointer" : "default" }}
  // style={{ width: "180px", height: "180px", cursor: "pointer" }}
/>
<input
  type="file"
  id="imageUpload"
  style={{ display: "none" }}
  onChange={handleImageChange}
  disabled={!isEditing} // Disable file input if not in editing mode
/>

            </div>
            <div className='flex flex-col gap-3'>
              <input
                type="email"
                className="input-links bg-zinc-500"
                value={teacherEmail}
                placeholder="KIIT mail"
              />
              <input
                className="input-links bg-zinc-500"
                type="text"
                placeholder='Location'
                onChange={handleChange}
                required
                name="location"
                value={profile.location}
                disabled={!isEditing} // DISABLE BASED ON isEditing
              />
              <input
                type="tel"
                className="input-links bg-zinc-500"
                value={teacherContact}
                placeholder="Contact"
              />
              {/* <input
                type="text"
                className="input-links bg-zinc-500"
                placeholder='Branch'
                onChange={handleChange}
                required
                name="branch"
                value={profile.branch}
                disabled={!isEditing} // DISABLE BASED ON isEditing
              /> */}
              {/* <select
                value={profile.selectYear}
                onChange={handleChange}
                name="selectYear"
                id="year"
                required
                className="input-links bg-zinc-500"
                disabled={!isEditing} // DISABLE BASED ON isEditing
              >
                <option value="">Select Year</option>
                <option value="1st year">1st Year</option>
                <option value="2nd year">2nd Year</option>
                <option value="3rd year">3rd Year</option>
                <option value="4th year">4th Year</option>
              </select> */}
            </div>
          </div>

          <div className='bg-zinc-500 border-2 rounded-md outline-none w-full right-profile-info p-5'>
            <h1 className='text-3xl text-start mb-3'>Write short bio</h1>
            <textarea
              className='outline-none bg-zinc-700 w-full border-2 rounded-md'
              onChange={handleChange}
              name="Bio"
              value={profile.Bio}
              required
              disabled={!isEditing} // DISABLE BASED ON isEditing
            ></textarea>
            <h1 className='text-2xl text-start mt-3 mb-2'>Social media links</h1>
            <div className='border-blue-300 flex flex-row bg-zinc-700 p-5 border-2 rounded-md outline-none'>
              <div className='space-y-5 ml-20'>
                <input
                  placeholder='Github Link'
                  className="input-links bg-zinc-500"
                  name="github"
                  onChange={handleChange}
                  value={profile.github}
                  disabled={!isEditing} // DISABLE BASED ON isEditing
                />
                <input
                  placeholder="LinkedIn Link"
                  className="input-links bg-zinc-500"
                  name="linkedin"
                  onChange={handleChange}
                  value={profile.linkedin}
                  disabled={!isEditing} // DISABLE BASED ON isEditing
                />
                {/* <input
                  placeholder="Leetcode Link"
                  className="input-links bg-zinc-500"
                  onChange={handleChange}
                  name="leetcode"
                  value={profile.leetcode}
                  disabled={!isEditing} // DISABLE BASED ON isEditing
                /> */}
              </div>
               <div className='space-y-5 me-20'>
               {/* <input
                  placeholder="Instagram Link"
                  onChange={handleChange}
                  className="bg-zinc-500 input-links"
                  name="instagram"
                  value={profile.instagram}
                  disabled={!isEditing} // DISABLE BASED ON isEditing
                />*/}
                <input
                  placeholder="Twitter Link"
                  onChange={handleChange}
                  className="bg-zinc-500 input-links"
                  name="twitter"
                  value={profile.twitter}
                  disabled={!isEditing} // DISABLE BASED ON isEditing
                />
              </div> 
            </div>
            {/* <div>
              <h1 className='text-2xl text-start mt-3 mb-2'>Ongoing Projects</h1>
              <textarea
                className='outline-none bg-zinc-700 w-full border-2 rounded-md'
                onChange={handleChange}
                name="projects"
                value={profile.projects}
                disabled={!isEditing} // DISABLE BASED ON isEditing
              ></textarea>
            </div> */}
            {/* <h1 className='text-2xl text-start mt-3 mb-2'>Skills</h1>
            <div>
              <textarea
                onChange={handleChange}
                className='bg-zinc-700 outline-none w-full border-2 rounded-md'
                name="skills"
                value={profile.skills}
                required
                disabled={!isEditing} // DISABLE BASED ON isEditing
              ></textarea>
            </div> */}
            <h1 className='text-2xl text-start mt-3 mb-2'>Domain</h1>
            <div>
            <Select
              isMulti
              options={domainOptions}
              value={domainOptions.filter((option) =>
                profile.domain.includes(option.value)
              )}
              onChange={handleDomainChange}
              styles={customStyles}
              isDisabled={!isEditing} // DISABLE BASED ON isEditing
            />
          </div>
          {/* SUBDOMAIN SELECTION */}
          <h1 className='text-2xl text-start mt-3 mb-2'>Subdomain</h1>
          <div>
            <Select
              isMulti
              options={profile.domain.flatMap(domain => subdomainOptions[domain] || [])} // Fetch subdomains based on selected domain
              value={subdomainOptions[profile.domain]?.filter((option) =>
                profile.subdomain.includes(option.value)
              )}
              onChange={handleSubdomainChange}
              styles={customStyles}
              isDisabled={!isEditing} // DISABLE BASED ON isEditing
            />
          </div>
          </div>
        </div>
        <div className='flex justify-center mt-5'>
          <button
            type="button"
            className='text-center px-5 py-2 bg-green-500 rounded-lg mr-3'
            onClick={() => setIsEditing(true)} // ENABLE EDIT MODE
          >
            Edit
          </button>
          <button
            type="submit"
            className='text-center px-5 py-2 bg-blue-500 rounded-lg'
            disabled={!isEditing} // DISABLE IF NOT EDITING
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default TeacherProfile;
