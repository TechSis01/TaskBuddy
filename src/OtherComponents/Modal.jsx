import { createPortal } from "react-dom";
import FormField from "../Authentication/FormField";
import TopHeader from "../Authentication/TopHeader";
import Button from "../Button";
import { GiCancel } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import { storage, promise, databases } from "../services/appwriteConfig";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import userPic from "../Images/avatar.jfif";
function Modal({
  modalState,
  modalStateFunc,
  hobbies,
  skills,
  setSkills,
  setHobbies,
  newUserProfile,
  updateBtn,
  setUpdateBtn,
  userBio,
  setUserData,
  noUserData,
  documentID
}) {
  let navigate = useNavigate();

  const {
    newUserSignUp,setNewUserSignUp
  } = useContext(UserContext);
  const [bio, setBio] = useState("");
  const [skill, setSkill] = useState("");
  const [hobby, setHobby] = useState("");

 
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };
  const handleHobbyChange = (e) => {
    setHobby(e.target.value);
  };

  const addSkillsArray = () => {
    setSkills([...skills, skill]);
    setSkill("");
  };

  const addHobbiesArray = () => {
    setHobbies([...hobbies, hobby]);
    setHobby("");
  };

  // Function to edit UserProfileBios
  const editUserProfile = async () => {
    try {
      let user = await promise.get();
      let res = await databases.createDocument(
        "647ca874cf8af94985ec",
        "65007b1194c34d190ea8",
        uuidv4(),
        {
          Bio: bio,
          Skills: skills,
          Hobbies: hobbies,
          uid: user.$id,
        }
      );
      setNewUserSignUp(false)
      modalStateFunc()
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfileBio = async () => {
    try {
      if(bio.length > 0)
      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "65007b1194c34d190ea8",
        documentID,
        {
          Bio:bio
        }
      );
      else if(bio.length === 0){
        await databases.updateDocument(
          "647ca874cf8af94985ec",
          "65007b1194c34d190ea8",
          documentID,
          {
            Bio:userBio
          }
        );
      }
      modalStateFunc()
    } catch (error) {
      console.log(error);
    }
  };

  const updateSkills = async()=>{
    setSkills((prevSkills) => [...prevSkills, skill])
    try{
      if(skill.length > 0)
    await databases.updateDocument(
        "647ca874cf8af94985ec",
        "65007b1194c34d190ea8",
        documentID,
        {
          Skills: [...skills, skill]
        }
      );
      else if(skill.length > 0){
      await databases.updateDocument(
          "647ca874cf8af94985ec",
          "65007b1194c34d190ea8",
          documentID,
          {
            Skills:  [...skills, skill]
          }
        );
      }
    setSkill("")
    }catch(error){
      console.log(error)
    }
  }
  const updateHobbies = async()=>{
    setHobbies((prevHobbies) => [...prevHobbies, hobby])
    try{
      let response = await databases.updateDocument(
        "647ca874cf8af94985ec",
        "65007b1194c34d190ea8",
        documentID,
        {
          Hobbies: [...hobbies, hobby]
        }
      );
    setHobby("");
    console.log("working")
    }catch(error){
      console.log(error)
    }
  }

  return createPortal(
    <section className="modalContainer absolute top-0 w-full h-screen bg-black bg-opacity-50">
      <div className="modalContent bg-white text-black w-6/12 mx-auto mt-20 p-8 rounded-md shadow-xl">
        <div className="flex justify-between">
          <TopHeader
            text="Fill in your Information"
            style="ml-2 font-semibold"
          />
          <div onClick={modalStateFunc} className="cursor-pointer">
            <GiCancel />
          </div>
        </div>
        
        <textarea
          className="border-2 outline-none rounded-md ml-2 p-2"
          rows="5"
          cols="60"
          placeholder="Bio..."
          onChange={handleBio}
          value={bio}
        ></textarea>
        <div className="flex">
          <FormField
            text="text"
            textPlaceholder="Add Skill"
            style="mb-4 mt-4"
            register={handleSkillChange}
            value={skill}
          />
          <div className="flex items-center">
            <AiOutlinePlus
              className=" bg-gray-1 ml-5 cursor-pointer rounded-full w-6/12"
              onClick={newUserSignUp ? addSkillsArray : updateSkills}
            />
          </div>
        </div>
        <div className="flex ">
          <FormField
            text="text"
            textPlaceholder="Add Hobby"
            style="mb-4 mt-4"
            register={handleHobbyChange}
            value={hobby}
          />
          <div className="flex items-center">
            <AiOutlinePlus
              className=" bg-gray-1 ml-5 cursor-pointer rounded-full w-6/12 "
              onClick={newUserSignUp ? addHobbiesArray : updateHobbies}
            />
          </div>
        </div>
        <Button
  btnFunc={newUserSignUp ? editUserProfile : updateUserProfileBio}
  btnText={newUserSignUp ? "Save" : "Update Bio"}
  style="ml-2 bg-green text-white px-7 py-2 rounded-md"
/>

      </div>
    </section>,
    document.getElementById("modal")
  );
}

export default Modal;
