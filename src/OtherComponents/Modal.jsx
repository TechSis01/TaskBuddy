import { createPortal } from "react-dom";
import FormField from "../Authentication/FormField";
import TopHeader from "../Authentication/TopHeader";
import Button from "../Button";
import { GiCancel } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import { storage, promise ,databases} from "../services/appwriteConfig";
import { useState,useContext,useEffect } from "react";
import { UserContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import userPic from "../Images/avatar.jfif"
function Modal({ modalState, modalStateFunc,hobbies,skills,setSkills,setHobbies,fetchProfilePic}) {
  let navigate = useNavigate()
  
  const {avatar,setAvatar,fileID,setFileID,profile,setProfile,documentID, setDocumentID,userId,setUserId,newUser,setNewUser} = useContext(UserContext)

  const [bio, setBio] = useState("");
  const [skill,setSkill] = useState("")
  const [hobby,setHobby] = useState("")
  // Set the state of the Profile Picture of the user
  const setProfilePic = (e)=>{
    setAvatar(e.target.files[0])
  }

  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleSkillChange = (e) => {
    setSkill(e.target.value)
  };
  const handleHobbyChange = (e) => {
    setHobby(e.target.value)
  };

  const addSkillsArray= ()=>{
    setSkills([...skills,skill])
    setSkill("")
  } 

  const addHobbiesArray = ()=>{
    setHobbies([...hobbies,hobby])
    setHobby("")
  }

  

  // Function to save image to Storage
  const handleStorage = async()=>{
    if(newUser === true){
      try{
        let userStorage = await storage.createFile('649e592acbaca9a5e268',fileID,avatar)
        modalStateFunc()
        fetchProfilePic()
        setNewUser(false)
       navigate("/container/profile")
       
        }
        catch(error){
          console.log(error)
        }
    }
    else if(newUser === false){
      
      try{
      //   console.log(fileID)
      //   console.log(newUser)
       await storage.deleteFile('649e592acbaca9a5e268',fileID)
       let userStorage = await storage.createFile('649e592acbaca9a5e268',fileID,avatar)
       let result = storage.getFilePreview("649e592acbaca9a5e268",fileID)
       setAvatar(result)
        console.log("updating")
        
        modalStateFunc()
        // fetchProfilePic()
      }
      catch(error){
        console.log(error.message)
      }
    }  
  }

  // USEEFFECT TO FETCH FILE ID AKA USER ID FROM LOCAL STORAGE
  // useEffect(()=>{
  //   setFileID(localStorage.getItem('userSession'))
  // },[])

  // Function to edit UserProfileBios
  const editUserProfile = async()=>{
    try {
      let promise = await databases.createDocument(
        "6493cf771433b4455fa2",
        "649e8e9e11e84f20d1b9",
        uuidv4(),
        {
          bio: bio,
          skills: skills,
          hobbies: hobbies,
        
        }
      );
      setDocumentID(promise.$id)
    } catch (error) {
      console.log(error.message);
    }
  }

  return createPortal(
    <section className="modalContainer absolute top-0 w-full h-screen bg-black bg-opacity-50">
      <div className="modalContent bg-white text-black w-6/12 mx-auto mt-20 p-8 rounded-md shadow-xl">
        <div className="flex justify-between">
          <TopHeader text="Add a Profile Picture" style="ml-2 font-semibold" />
          <div onClick={modalStateFunc} className="cursor-pointer">
            <GiCancel />
          </div>
        </div>
        <FormField text="file" style="mb-4" register={setProfilePic} id="profilepic"/>
        <textarea
          className="border-2 outline-none rounded-md ml-2 p-2"
          rows="5"
          cols="60"
          placeholder="Let's get to know you..."
          onChange={handleBio}
          value={bio}
        ></textarea>
        <div className="flex ">
          <FormField text="text" textPlaceholder="Add Skill" style="mb-4" register={handleSkillChange} value={skill}/>
          <div className=" bg-gray-1">
            <AiOutlinePlus onClick={addSkillsArray}/>
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
          <div className=" mt-4 bg-gray-1">
            <AiOutlinePlus onClick={addHobbiesArray}/>
          </div>
        </div>
        <Button
          btnFunc={handleStorage}
          btnText="Save"
          style="ml-2 bg-green text-white px-7 py-2 rounded-md"
        />
      </div>
    </section>,
    document.getElementById("modal")
  );
}

export default Modal;
