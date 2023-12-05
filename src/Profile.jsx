/* eslint-disable react/jsx-key */
import ProfilePic from "./OtherComponents/ProfilePic";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./App";
import Button from "./Button";
import { BsFillInfoCircleFill, BsFillHeartPulseFill } from "react-icons/bs";
import { HiLightBulb } from "react-icons/hi";
import { RiContactsBook2Fill } from "react-icons/ri";
import Modal from "./OtherComponents/Modal";
import { databases, promise,storage} from "./services/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DeleteModal from "./OtherComponents/DeleteModal";
import DeleteHobbyModal from "./OtherComponents/DeleteHobbyModal";
import loadBtn from "./Images/btnLoad.gif"
function Profile() {
  let navigate = useNavigate();
  const {
    avatar,
    setAvatar,
    currentUserEmail,
    avatarID,
    setAvatarID,
    setIsAsideBarOpen,
  } = useContext(UserContext);
  const [noUserData, setUserData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userBio, setUserBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [docID, setDocID] = useState("");
  const [updateBtn, setUpdateBtn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [modalBtn, setModalBtn] = useState("Save")
  const [displayPic, setDisplayPic] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteHobbyModal, setDeleteHobbyModal] = useState(false)
  const [skillDeleted, setSkilldeleted] = useState("")
  const [hobbyDeleted, setHobbydeleted] = useState("")
  const [imageTooltip, setImageTooltip] = useState(false)
  // const [loading,setLoading] = useState(false)
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

  // FUNCTION FOR PROFILE PICTURE
  const handleSubmit = async(e)=>{
    e.preventDefault();
  
    const imageInput = document.getElementById("fileInput")
    const image = imageInput.files[0]
    let url = URL.createObjectURL(image);
      setAvatar(url)
    try{
      let user = await promise.get();
     
      if(!image){
        console.log("please select an image file")
        return
      }
      const imageId = uuidv4()
      const newImage = await storage.createFile(
        "649e592acbaca9a5e268",
        imageId,
        image
      );

      const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/649e592acbaca9a5e268/files/${imageId}/view?project=a1&mode=admin`;
     if(displayPic){
          await databases.updateDocument(
            "647ca874cf8af94985ec",
            "65058e1e9a1add9c9034",
            avatarID,
            {
              url: imageUrl,
            }
          );
     } 
     else{
      await databases.createDocument(
        "647ca874cf8af94985ec",
        "65058e1e9a1add9c9034",
        imageId,
        {
          url: imageUrl,
          uid: user.$id,
        }
      );  
     }
  
    }catch(error){
      console.log(error.message)
    } 
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
      <div className="">
        <ProfilePic
          image={avatar}
          altText="Profile pic"
          style="w-1/5 my-4 rounded-full object-cover transition-transform transform bg-gray-300 group-hover:scale-80 group-hover:opacity-50"
          // clickImage={(e)=>uploadImage(e)}
          tooltip = {imageTooltip}
        />
        <input
          type="file"
          id="fileInput"
          accept=".jpg,.jpeg,.png"
          onChange={(e)=>{
            setUserImage(e.target.files[0])
          }}
          className="my-2"
        ></input>
      </div>
      <div className="flex">
      <button onClick={handleSubmit}  disabled={!userImage}  className="{`mb-2 py-2 px-2 hover:bg-purple-400 bg-purple-3
              } text-white rounded-md flex justify-center items-center hover:bg-purple-4`}">{displayPic ? "Update display Image" : "Upload display Image"}</button>
      {/* {loading ? <img src={loadBtn} alt="spinner"></img>: null} */}
      </div>
     
      <div className="pb-16 pl-4 mb-2 mt-2 pt-2 border rounded-md shadow-md">
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
