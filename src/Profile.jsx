/* eslint-disable react/jsx-key */
import React from "react";
import ProfilePic from "./OtherComponents/ProfilePic";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./App";
import Button from "./Button";
import { BsFillInfoCircleFill, BsFillHeartPulseFill } from "react-icons/bs";
import { GrContactInfo } from "react-icons/gr";
import { HiLightBulb } from "react-icons/hi";
import { RiContactsBook2Fill } from "react-icons/ri";
import Modal from "./OtherComponents/Modal";
import { databases, promise } from "./services/appwriteConfig";
import { Query } from "appwrite";
import profilepic from "./Images/avatar.jfif";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import DeleteModal from "./OtherComponents/DeleteModal";
import DeleteHobbyModal from "./OtherComponents/DeleteHobbyModal";
import {RxHamburgerMenu} from "react-icons/rx"

function Profile() {
  let navigate = useNavigate();
  const {
    avatar,
    setAvatar,
    currentUser,
    currentUserEmail,
    newUserSignUp,
    setNewUserSignUp,
    avatarID,
    setAvatarID,
    newUserSignUpPic,
    setNewUserSignUpPic,
    isAsideBarOpen, setIsAsideBarOpen,
  } = useContext(UserContext);
  const [noUserData, setUserData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userBio, setUserBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [docID, setDocID] = useState("");
  const [updateBtn, setUpdateBtn] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalBtn, setModalBtn] = useState("Save")
  const [displayPic, setDisplayPic] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteHobbyModal, setDeleteHobbyModal] = useState(false)
  const [skillDeleted, setSkilldeleted] = useState("")
  const [hobbyDeleted, setHobbydeleted] = useState("")
  const [imageTooltip, setImageTooltip] = useState(false)
  const editProfile = () => {
    setShowModal(true);
  };

  const removeModal = () => {
    setShowModal(false);
    
  };

  useEffect(() => {
    // Get the JSON string from localStorage
    const jsonString = localStorage.getItem("userProfile");
    if(jsonString ){
      setModalBtn("Update")
    const userProfile = JSON.parse(jsonString);
    setHobbies(userProfile.Hobbies);
      setSkills(userProfile.Skills);
      setUserBio(userProfile.Bio);
      setDocID(userProfile.doc)
    }
    setIsAsideBarOpen(false)
  }, [showModal])
  useEffect(() => {
    // Get the JSON string from localStorage
    const userPicture = localStorage.getItem("userProfilePicture");
    if(userPicture ){
      setDisplayPic(true)
    const userProfile = JSON.parse(userPicture);
    setAvatar(userProfile.picURL);
    setAvatarID(userProfile.uniqueKey)
    console.log(userPicture.picURL)
    }
  
  }, [])

  const deleteitem = async (hobby) => {
    const remainingHobby = hobbies.filter((delHobby) => delHobby !== hobby);
    setHobbies(remainingHobby);
    try {
      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "65007b1194c34d190ea8",
        docID,
        {
          Hobbies: remainingHobby,
        }
      );
       // Update the userSkillsArray in localStorage
    const userHobbyArray = JSON.parse(localStorage.getItem("userProfile"));
    userHobbyArray.Hobbies = remainingHobby
     // Update the array in localStorage
     localStorage.setItem("userProfile", JSON.stringify(userHobbyArray));
     setDeleteHobbyModal(false)
    } catch (error) {
      console.log(error);
    }
  };
   const verifyDeleteSkill = (skill)=>{
    setSkilldeleted(skill)
      setDeleteModal(true)
   }
   const verifyDeleteHobby = (hobby)=>{
    setHobbydeleted(hobby)
      setDeleteHobbyModal(true)
   }

   const keepSkill = ()=>{
    setDeleteModal(false)
   }
   const keepHobby = ()=>{
    setDeleteHobbyModal(false)
   }
  const deleteSkill = async (skill) => {
   
    const remainingSkills = skills.filter((delSkill) => delSkill !== skill);
    setSkills(remainingSkills);
   
    try {
      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "65007b1194c34d190ea8",
        docID,
        {
          Skills: remainingSkills,
        }
      );
      console.log(remainingSkills)
      // Update the userSkillsArray in localStorage
    const userSkillsArray = JSON.parse(localStorage.getItem("userProfile"));
    userSkillsArray.Skills = remainingSkills
    // Update the array in localStorage
    localStorage.setItem("userProfile", JSON.stringify(userSkillsArray));
    setDeleteModal(false)
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setAvatar(url);
   let pictureUniqueKey = uuidv4()
    try {
      let user = await promise.get();
      await databases.createDocument(
        "647ca874cf8af94985ec",
        "65058e1e9a1add9c9034",
       pictureUniqueKey,
        {
          url: url,
          uid: user.$id,
        }
      );
      const profilePictureData = {
        picURL : url,
        uniqueKey:pictureUniqueKey

       }
      const jsonString = JSON.stringify(profilePictureData)
        localStorage.setItem("userProfilePicture", jsonString)
      console.log("added new dp")
      // setNewUserSignUpPic(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFileChange = async (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setAvatar(url);
    try {
      let user = await promise.get();
      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "65058e1e9a1add9c9034",
        avatarID,
        {
          url: url,
        }
      );
       // Update the userSkillsArray in localStorage
    const userPicture = JSON.parse(localStorage.getItem("userProfilePicture"));
    userPicture.picURL = url
    // Update the array in localStorage
    localStorage.setItem("userProfilePicture", JSON.stringify(userPicture));
      console.log("updated dp")
    } catch (error) {
      console.log(error);
    }
  };
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
    setImageTooltip(true)
  };

  const openAside = ()=>{
    setIsAsideBarOpen(!isAsideBarOpen)
  }
  return (
    <section className="lg:w-8/12 px-4">
      <div className="flex justify-between items-center">
        <h1 className="mt-4 font-bold text-3xl">My Profiles</h1>
        <Button
          btnFunc={editProfile}
          btnText="Edit Profile"
          style="border-2 border-gray-2 border-dashed p-2 rounded-md mt-4 hover:bg-gray-1"
        />
      </div>
      <div className="flex items-center">

        <ProfilePic
          image={avatar}
          altText="Profile pic"
          style="w-4/12 my-4 rounded-full cursor-pointer object-cover transition-transform transform bg-gray-300 group-hover:scale-80 group-hover:opacity-50"
          clickImage={triggerFileInput}
          tooltip = {imageTooltip}
        />
        <input
          type="file"
          id="fileInput"
          accept=".jpg,.jpeg,.png"
          onChange={displayPic ? updateFileChange: handleFileChange}
          className="hidden"
        ></input>
      </div>
      <div className="pb-16 pl-4 mb-2 pt-2 border rounded-md shadow-md">
        <div className="flex items-center">
          <p className="text-purple-4 fill-current mr-2">
            <BsFillInfoCircleFill />
          </p>
          <h3 className="text-xl font-semibold">Bio</h3>
        </div>
        {userBio.length === 0 ? (
          <p className="italic text-gray-3 py-2">No Bio added</p>
        ) : (
          <p className="italic text-black py-2">{userBio}</p>
        )} 
      </div>

      <div className="pb-16 pl-4 mb-2 pt-2border rounded-md shadow-md">
        <div className="flex items-center">
          <p className="text-yellow fill-current mr-2">
            <HiLightBulb />
          </p>
          <h3 className="text-xl font-semibold">Skills</h3>
        </div>
        {skills.length === 0 ? (
          <p className="italic text-gray-3 py-2">No Skills added</p>
        ) : (
          <div className="flex pt-5 flex-wrap ">
            {skills.map((skill,index) => (
              <div
                className="mx-2 mt-2 p-2 border rounded-md shadow-md italic cursor-pointer"
                // onClick={() => deleteSkill(skill)}
                onClick={ ()=>verifyDeleteSkill(skill)}
                key={index}
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pb-16 pl-4 mb-2 pt-2 border rounded-md shadow-md">
        <div className="flex items-center ">
          <p className="text-red fill-current mr-2">
            <BsFillHeartPulseFill />
          </p>
          <h3 className="text-xl font-semibold">Hobbies</h3>
        </div>
        {hobbies.length === 0 ? (
          <p className="italic text-gray-3 py-2">No Hobbies added</p>
        ) : (
          <div className="flex pt-5 flex-wrap">
            {hobbies.map((hobby,index) => (
              <div
                className="mx-2 mt-2 p-2 border rounded-md shadow-md italic cursor-pointer "
                onClick={() =>  verifyDeleteHobby(hobby)}
                key={index}
              >
                {hobby}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pb-16 pl-4 mb-2 pt-2 border rounded-md shadow-md">
        <div className="flex items-center ">
          <p className="text-blue fill-current mr-2">
            <RiContactsBook2Fill />
          </p>
          <h3 className="text-xl font-semibold"> Contact Information</h3>
        </div>
        <p className="italic text-black py-2">{currentUserEmail}</p>
      </div>
      {deleteModal && <DeleteModal skillDeleted={skillDeleted} deleteModal={deleteModal} deleteSkill={deleteSkill} keepSkill={keepSkill}/>}
      {deleteHobbyModal && <DeleteHobbyModal hobbyDeleted={hobbyDeleted} deleteModal={deleteHobbyModal} deleteitem={deleteitem} keepHobby={keepHobby}/>}
      {showModal && (
        <Modal
          modalState={showModal}
          modalStateFunc={removeModal}
          skills={skills}
          setSkills={setSkills}
          setHobbies={setHobbies}
          hobbies={hobbies}
          updateBtn={updateBtn}
          setUpdateBtn={setUpdateBtn}
          setUserData={setUserData}
          setUserBio = {setUserBio}
          userBio={userBio}
          documentID={docID}
          modalBtn={modalBtn}
          setModalBtn={setModalBtn}
        />
      )}
    </section>
  );
}

export default Profile;
