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
function Profile() {
  let navigate = useNavigate();
  const {
    avatar,
    setAvatar,
    currentUser,
    currentUserEmail,
    newUserSignUp,
    setNewUserSignUp,avatarID,setAvatarID,newUserSignUpPic, setNewUserSignUpPic
  } = useContext(UserContext);
  const [noUserData, setUserData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userBio, setUserBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [docID, setDocID] = useState("");
  const [updateBtn, setUpdateBtn] = useState(false);
  const [selectedFile,setSelectedFile] = useState(null)
  
  const editProfile = () => {
    setShowModal(true);
  };

  const removeModal = () => {
    setShowModal(false);
    fetchUserProfile();
  };

  const fetchUserProfile = async () => {
    try {
      let user = await promise.get();
      let res = await databases.listDocuments(
        "647ca874cf8af94985ec",
        "65007b1194c34d190ea8",
        [Query.equal("uid", user.$id)]
      );
      if (res) {
        setHobbies(res.documents[0].Hobbies);
        setSkills(res.documents[0].Skills);
        setUserBio(res.documents[0].Bio);
        setDocID(res.documents[0].$id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
    } catch (error) {
      console.log(error);
    }
  };

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
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileChange = async (e)=>{
     let url = URL.createObjectURL(e.target.files[0]);
    setAvatar(url)
    try{
      let user = await promise.get();
      await databases.createDocument(
        "647ca874cf8af94985ec",
        "65058e1e9a1add9c9034",
        uuidv4(),{
          url:url,
          uid:user.$id,
        }
      )
      setNewUserSignUpPic(false)
    
    }catch(error){
      console.log(error)
    }
  }

  const updateFileChange = async(e)=>{
    let url = URL.createObjectURL(e.target.files[0]);
    setAvatar(url)
    try{
      let user = await promise.get();
      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "65058e1e9a1add9c9034",
          avatarID,{
          url:url,
        }
      )
    
    }catch(error){
      console.log(error)
    }
  }
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  

  return (
    <section className="lg:w-8/12 px-4">
      <div className="flex justify-between items-center">
        <h1 className="mt-4 font-bold text-3xl">My Profile</h1>
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
          style="w-4/12 my-4 rounded-full cursor-pointer"
          clickImage={triggerFileInput}
        />
        <input type="file" id="fileInput" accept=".jpg,.jpeg,.png" onChange={newUserSignUpPic ? handleFileChange : updateFileChange} className="hidden"></input>
      </div>
      <div className="pb-16 pl-4 mb-2 pt-2 border rounded-md shadow-md">
        <div className="flex items-center">
          <p className="text-purple-4 fill-current mr-2">
            <BsFillInfoCircleFill />
          </p>
          <h3 className="text-xl font-semibold">Bio</h3>
        </div>
        {newUserSignUp ? (
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
        {newUserSignUp || skills.length === 0  ? (
          <p className="italic text-gray-3 py-2">No Skills added</p>
        ) : (
          <div className="flex pt-5 flex-wrap ">
            {skills.map((skill) => (
              <div
                className="mx-2 mt-2 p-2 border rounded-md shadow-md italic cursor-pointer"
                onClick={() => deleteSkill(skill)}
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
        {newUserSignUp || hobbies.length === 0 ? (
          <p className="italic text-gray-3 py-2">No Hobbies added</p>
        ) : (
          <div className="flex pt-5 flex-wrap">
            {hobbies.map((hobby) => (
              <div
                className="mx-2 mt-2 p-2 border rounded-md shadow-md italic cursor-pointer "
                onClick={() => deleteitem(hobby)}
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
          userBio={userBio}
          documentID={docID}
        />
      )}
    </section>
  );
}

export default Profile;
