import { useState,useContext,useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import loading from "../Images/loading.gif";
import { GiCheckMark } from "react-icons/gi";
import { promise } from "../services/appwriteConfig";
import { databases } from "../services/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { client } from "../services/appwriteConfig";
import FormField from "../Authentication/FormField";
import format from "date-fns/format";
function TaskBox({ task,setTasks,allTasks}) {
  const { userTasks,setUserTasks,setCriticalTasks} = useContext(UserContext)
  const [inProgressTask, setInProgressTask] = useState("Start Task");
  const [completedState, setCompletedState] = useState("Finish");
  const[activeBtn, setActiveBtn] = useState(false)
  const[editTitleInputs ,setTitleEditsInput ] = useState(false)
  const[editDescriptionInputs ,setDescriptionEditInput ] = useState(false)
  const[editDateInputs ,setDateEditsInput ] = useState(false)
  const[title ,setTitle] = useState("")
  const[description ,setDescription] = useState("")
  const[date ,setDate] = useState("")
 


  // FUNCTION TO CLICK ON PENCIL , SO TASK CAN BE EDITED
  const editUserTitleInputs = ()=>{
    setTitleEditsInput(true)
  }
  const editUserDescriptionInputs = ()=>{
    setDescriptionEditInput(true)
  }
  const editUserDateInputs = (tas)=>{
   
        setDateEditsInput(true)
    
  }

  const editTitle = (event,tas)=>{
    const updatedTask = task.map((completeTas) =>
    completeTas.$id === tas.$id ? {...tas, title: event.target.value } : completeTas
  );
  setTasks(updatedTask);
      setTitle(event.target.value)
  }

  const editDescription= (event,tas)=>{
    const updatedTask = task.map((completeTas) =>
    completeTas.$id === tas.$id ? {...tas, taskDescription: event.target.value } : completeTas
  );
  setTasks(updatedTask);
      setDescription(event.target.value)
  }

  const editDate = (event,tas)=>{
    const updatedTask = task.map((completeTas) =>
    completeTas.$id === tas.$id ? {...tas, dueDate: event.target.value } : completeTas
  );
  setTasks(updatedTask);
      setDate(event.target.value)
      console.log(tas.dueDate)
  }


  // Button to Update Task
  const upDateTasks = async(tas)=>{
    try{
      await databases.updateDocument("647ca874cf8af94985ec", "6481e04550c724af79aa", tas.$id, {
        title:title,
        taskDescription:description,
        dueDate:date
      });
      setTitleEditsInput(false)
      setDescriptionEditInput(false)
      setDateEditsInput(false)
    }
    catch(error){
      console.log(error.message)
    }
    console.log(title,description,date)
  }
  // FUNCTION TO COMPLETE TASK WHEN BUTTON IS CLICKED
  const completeTaskFunction = async (tas) => {
    try {
      const updatedTask = task.map((completeTas) =>
        completeTas.$id === tas.$id ? { ...tas, status: "Completed" } : completeTas
      );
 
      await databases.updateDocument("647ca874cf8af94985ec", "6481e04550c724af79aa", tas.$id, {
        status: "Completed",
      });
 
      setCompletedState("Completed");
      setTasks(updatedTask);
      setActiveBtn(true)

      // Step 1: Retrieve the array from localStorage
const storedArray = JSON.parse(localStorage.getItem('userMediumTask'));

// Step 2: Find and modify the specific item in the array
const itemToUpdate = storedArray.find((item) => item.id === tas.$id);
if (itemToUpdate) {
  console.log("REadl")
  // Modify the properties of the item as needed
  itemToUpdate.status = "Completed";
}

// Step 3: Update the array in localStorage
localStorage.setItem('userMediumTask', JSON.stringify(storedArray));
    } catch (error) {
      console.log(error);
    }
  };
 

  // Function to start task, when the Start button is clicked
  const inProgressFunction = async (tas) => {
    try {

      const updatedTask = task.map((completeTas) =>
      completeTas.$id === tas.$id ? { ...tas, status: "In Progress" } : completeTas
    );
      await databases.updateDocument("647ca874cf8af94985ec", "6481e04550c724af79aa", tas.$id, {
        status: "In Progress",
      });

      setInProgressTask("In Progress");
      setTasks(updatedTask);
    } catch (error) {
      console.log(error);
    }
  };
 
  // Function to delete task
  const deleteTask = async (id) => {
    try {
      const deleted = await databases.deleteDocument("647ca874cf8af94985ec", "6481e04550c724af79aa", id);
      const remainingTask = task.filter((delTask) => delTask.$id !== id);
      setTasks(remainingTask);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="mt-16 text-sm">
      {task.map((tas) => (
        <div className="mt-10 border rounded-md shadow-md items-center" key={tas.$id}>
          <div className="border-b py-4 pl-5">
            <p className="font-semibold">Task</p>
            <div className="flex items-center justify-between">
              {editTitleInputs ? <input value={tas.title} type="text" onChange={(event)=>editTitle(event,tas)} className="border border-gray-50 outline-none w-3/6 p-2 focus:border"></input> : <p>{tas.title}</p>}
              <BsPencil onClick={editUserTitleInputs} className="mr-5 cursor-pointer hover:text-lg transition duration-500 ease-in-out" />
            </div>
          </div>
          <div className="border-b py-4 pl-5">
            <p className="font-semibold">Description</p>
            <div className="flex items-center justify-between">
              {editDescriptionInputs ? <input value={tas.taskDescription} type="text" onChange={(event)=>editDescription(event,tas)}></input> : <p>{tas.taskDescription}</p>}
              <BsPencil onClick={editUserDescriptionInputs} className="mr-5 cursor-pointer hover:text-lg transition duration-500 ease-in-out" />
            </div>
          </div>
          <div className="border-b py-4 pl-5 ">
            <p className="font-semibold">Due Date</p>
            <div className="flex items-center justify-between">          
         {/* <input value = {tas.dueDate} type="text"  onChange={(event) => editDate(event, tas)} /> */}

{/* //   <p>{tas.dueDate}</p> */}
              {editDateInputs ? <input value={tas.dueDate} type="text" onChange={(event)=>editDate(event,tas)}></input> : <p>{tas.dueDate}</p>}
              <BsPencil onClick={editUserDateInputs} className="mr-5 cursor-pointer hover:text-lg transition duration-500 ease-in-out" />
            </div>
          </div>
          <div className="flex justify-between items-center border-b py-4 pl-5 ">
            <div className="flex items-center">
              <button onClick = {()=>upDateTasks(tas)}className="bg-deep-blue text-white p-2 rounded-md">Update</button>
              <AiFillDelete
                onClick={() => deleteTask(tas.$id)}
                className="ml-5 text-red text-xl cursor-pointer hover:text-2xl transition duration-500 ease-in-out"
              />
            </div>
            <div className="w-4/12 flex justify-around">
              <button disabled={tas.status === "Completed" && activeBtn}
                className={`bg-purple-4 text-white p-2 rounded-md transition duration-500 ease-in-out ${
                 tas.status === "Completed" ? "bg-gray-2" : "bg-green"
              
                }`}
                onClick={() => inProgressFunction(tas)}
              >
             {/* {tas.status === "Completed" && <GiCheckMark /> } */}
            {tas.status === "In Progress" ? "In Progress" : "Start Task"} 
              {/* {tas.status === "Not Started" && inProgressTask} */} 
              </button>
              <button
                className={`bg-green text-white p-2 rounded-md transition duration-500 ease-in-out ${
                  tas.status === "Completed" ? "bg-green" : ""
                }`}
                onClick={() => completeTaskFunction(tas)}
              >
                {tas.status === "Completed" ? "Completed" : "Finish"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
 
export default TaskBox;
 









