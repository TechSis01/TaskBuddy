import { createPortal } from "react-dom";
import TopHeader from "../Authentication/TopHeader";
import Button from "../Button";
import { AiOutlinePlus } from "react-icons/ai";
import {  promise, databases } from "../services/appwriteConfig";
import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
function Modal({
  modalStateFunc,
  hobbies,
  skills,
  setSkills,
  setHobbies,
  userBio,
  documentID,
  setUserBio,
  modalBtn,
}) {
  const [bio, setBio] = useState("");
  const [skill, setSkill] = useState("");
  const [hobby, setHobby] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const notify = (notifyText) => {
    toast(notifyText, {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleSkillChange = (e) => {
      setSkill(e.target.value);
  }
  const handleHobbyChange = (e) => {
    setHobby(e.target.value);
  };

  const addSkillsArray = () => {
    if (!skill) {
      alert("Empty skill")
      console.log("skill field is empty")
    } else if(skill && skill.trim()) {
      console.log("new skill",skill)
      setSkills([...skills, skill]);
      setSkill('');
    }
   setSkill("")
  };
  
  const addHobbiesArray = () => {
    // Update the state to add the new hobby
    setHobbies([...hobbies, hobby])
    setHobby("")
  }
  // Function to edit UserProfileBios
  const editUserProfile = async () => {
    let documentKey = uuidv4()
        try {
      let user = await promise.get();
      let res = await databases.createDocument(
        "647ca874cf8af94985ec",
        "65007b1194c34d190ea8",
       documentKey,
        {
          Bio: bio,
          Skills: skills,
          Hobbies: hobbies,
          uid: user.$id,
        }
      );
      const profileData = {
        Bio: bio,
        Skills: skills,
        Hobbies: hobbies,
        doc:documentKey
      }
      const jsonString = JSON.stringify(profileData)
      localStorage.setItem("userProfile", jsonString)
      setUserBio(bio)
      modalStateFunc()
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfileBio = async () => {
    try {
      if (bio.length > 0)
        await databases.updateDocument(
          "647ca874cf8af94985ec",
          "65007b1194c34d190ea8",
          documentID,
          {
            Bio: bio,
          }
        );
      else if (bio.length === 0) {
        await databases.updateDocument(
          "647ca874cf8af94985ec",
          "65007b1194c34d190ea8",
          documentID,
          {
            Bio: userBio,
          }
        );
      }
      const usersBio = JSON.parse(localStorage.getItem("userProfile"));
          usersBio.Bio = bio || userBio
// Step 3: Update the array in localStorage
localStorage.setItem("userProfile", JSON.stringify(usersBio))
      modalStateFunc();
    } catch (error) {
      console.log(error);
    }
  };

const updateSkills = async () => {
  if (!skill) {
   notify("Please add a skill")
    return; // Don't proceed if the skill is empty
  }
 else if(skill && skill.trim()){
  setSkill("");
  try {
    await databases.updateDocument(
      "647ca874cf8af94985ec",
      "65007b1194c34d190ea8",
      documentID,
      {
        Skills: [...skills, skill],
      }
    );
    // Update the userSkillsArray in localStorage
    const userSkillsArray = JSON.parse(localStorage.getItem("userProfile"));
    userSkillsArray.Skills = [...userSkillsArray.Skills, skill];
    // Update the array in localStorage
    localStorage.setItem("userProfile", JSON.stringify(userSkillsArray));
    // Reset the skill input field
    notify("New skill added")
  } catch (error) {
    console.log(error);
  }
}
};

  const updateHobbies = async () => {
    if (!hobby) {
      notify("Please add a hobby")
      return; // 
    }
    else if(hobby && hobby.trim()){
      setHobby("");
    try {
      let response = await databases.updateDocument(
        "647ca874cf8af94985ec",
        "65007b1194c34d190ea8",
        documentID,
        {
          Hobbies: [...hobbies, hobby],
        }
      );
      const userHobbiesArray = JSON.parse(localStorage.getItem("userProfile"));
      userHobbiesArray.Hobbies = [...userHobbiesArray.Hobbies,hobby]
// Step 3: Update the array in localStorage
localStorage.setItem("userProfile", JSON.stringify(userHobbiesArray))
notify("New hobby added")
    } catch (error) {
      console.log(error);
    }
  }
  };

  return createPortal(
    <section className="modalContainer absolute top-0 w-full h-screen bg-black bg-opacity-50">
       <ToastContainer />
      <div className="modalContent bg-white text-black w-11/12 md:w-6/12 mx-auto mt-20 p-12 rounded-md shadow-xl">
        <div className="flex justify-between">
          <TopHeader
            text="Fill in your Information"
            style="ml-2 font-semibold"
          />
          <div onClick={modalStateFunc} className="cursor-pointer">
           <AiOutlineClose />
          </div>
        </div>

        <textarea
          className="border-2 outline-none rounded-md  p-2 w-4/5 md:w-auto"
          rows="5"
          cols="60"
          placeholder="Bio..."
          onChange={handleBio}
          name={modalBtn === "Save" ? bio : userBio}
          defaultValue={modalBtn === "Save" ? bio : userBio}
        ></textarea>
        <div className="flex">
          <input type="text" placeholder="Add Skill" className="mb-4 mt-4 border outline-none border-gray-1 py-2 px-2 rounded-md ring-0" onChange={handleSkillChange} value={skill}></input>
          <div className="flex items-center">
            <button onClick={modalBtn === "Save"? addSkillsArray : updateSkills}>
            <AiOutlinePlus
              className=" bg-gray-1 ml-5 cursor-pointer rounded-full w-6/12"
            />
            </button>
          </div>
        </div>
        <div className="flex ">
        <input type="text" placeholder="Add Hobby" className="mb-4 mt-4 border outline-none border-gray-1 py-2 px-2 rounded-md ring-0" onChange={handleHobbyChange} value={hobby}></input>
          <div className="flex items-center">
            <button disabled={isButtonDisabled} onClick={modalBtn === "Save" ? addHobbiesArray : updateHobbies}                                       >
            <AiOutlinePlus
              className=" bg-gray-1 ml-5 cursor-pointer rounded-full w-6/12 "
            />
            </button>
          </div>
        </div>
        <button
  className={`ml-2 ${bio ? 'bg-green' : 'bg-gray-400'} text-white px-7 py-2 rounded-md`}
  disabled={!bio}
  onClick={modalBtn === 'Save' ? editUserProfile : updateUserProfileBio}
>
  {modalBtn}
</button>
      </div>
    </section>,
    document.getElementById("modal")
  );
}

export default Modal;
