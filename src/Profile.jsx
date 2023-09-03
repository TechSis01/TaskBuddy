import React from "react";
import ProfilePic from "./OtherComponents/ProfilePic";
import { useContext, useState , useEffect} from "react";
import { UserContext } from "./App";
import Button from "./Button";
import { BsFillInfoCircleFill,BsFillHeartPulseFill } from "react-icons/bs";
import { GrContactInfo } from "react-icons/gr";
import {HiLightBulb} from 'react-icons/hi'
import {RiContactsBook2Fill} from 'react-icons/ri'
import Modal from "./OtherComponents/Modal";
import { storage,databases } from "./services/appwriteConfig";
import { Query } from "appwrite";
import profilepic from "./Images/avatar.jfif"
import { useNavigate } from "react-router-dom";
function Profile() {
  let navigate = useNavigate()
  const {
    avatar,
    setAvatar,
    currentUser,
    currentUserEmail,
    setCurrentUserEmail,
    fileID,setFileID,documentID, setDocumentID,userId,setUserId,newUser,setNewUser
  } = useContext(UserContext);
  const [noUserData, setUserData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState([]);
 const [hobbies,setHobbies] = useState([])

  const editProfile = () => {
    // navigate("/container/projects")
   setShowModal(true)
  };

  const removeModal = ()=>{
    setShowModal(false)
  }

  // Fetch profile pic
  const fetchProfilePic = ()=>{
    let result = storage.getFilePreview("649e592acbaca9a5e268",fileID)
    setAvatar(result)
    console.log(result)
    // if(newUser === false){
    //     let result = storage.getFilePreview("649e592acbaca9a5e268",item)
    //     setAvatar(result)
    //   }
    // else if(newUser === true){
    //   setAvatar(profilepic)
    // }   
  }
  
  useEffect(()=>{
    console.log(newUser)
    setFileID(localStorage.getItem('userSession'))
  },[])

  // Fetch user profile information
  // const fetchUserInfo = async()=>{
  //   try{
  //     let response = await databases.getDocument("6493cf771433b4455fa2","649e8e9e11e84f20d1b9",documentID)
  //     console.log(response)
  //   }
  //   catch(error){
  //     console.log(error.message)
  //   }
  // }
  return (
    <section className="lg:w-8/12 px-4" >
      <div className="flex justify-between items-center">
        <h1 className="mt-4 font-bold text-3xl">My Profile</h1>
        <Button
          btnFunc={editProfile}
          btnText="Edit Profile"
          style="border-2 border-gray-2 border-dashed p-2 rounded-md mt-4 hover:bg-gray-1"
        />
      </div>
      <div className="flex items-center">
        <ProfilePic image={avatar} altText="Profile pic" style="w-6/12 rounded-full" />
        <div>
          <p className="font-bold">{currentUser}</p>
          <p className="italic">Frontend Developer</p>
        </div>
      </div>
      <div className="pb-16 pl-4 mb-2 border rounded-md shadow-md">
        <div className="flex items-center">
          <p className="text-purple-4 fill-current mr-2"><BsFillInfoCircleFill /></p>
          <h3 className="text-xl font-semibold">Bio</h3>
        </div>
        {noUserData && <p className="italic text-gray-3 py-2">No Bio added</p>}
      </div>

      <div className="pb-16 pl-4 mb-2 border rounded-md shadow-md">
        <div className="flex items-center">
        <p className="text-yellow fill-current mr-2"><HiLightBulb /></p>
          <h3 className="text-xl font-semibold">Skills</h3>
        </div>
        {noUserData && <p className="italic text-gray-3 py-2">No Skills added</p>}
      </div>

      <div className="pb-16 pl-4 mb-2 border rounded-md shadow-md">
        <div className="flex items-center">
          <p className="text-red fill-current mr-2"><BsFillHeartPulseFill /></p>
          <h3 className="text-xl font-semibold">Hobbies</h3>
        </div>
        {noUserData && <p className="italic text-gray-3 py-2">No Hobbies added</p>}
      </div>

      <div className="pb-16 pl-4 mb-2 border rounded-md shadow-md">
        <div className="flex items-center ">
        <p className="text-blue fill-current mr-2"><RiContactsBook2Fill /></p>
          <h3 className="text-xl font-semibold"> Contact Information</h3>
        </div>
        <p className="italic text-gray-3 py-2">{currentUserEmail}</p>
      </div>
      {showModal && <Modal modalState={showModal} modalStateFunc={removeModal} skills={skills} setSkills={setSkills} setHobbies={setHobbies} hobbies={hobbies} fetchProfilePic={fetchProfilePic}/>}
    </section>
  );
}

export default Profile;
