import { useState, useContext, useEffect,useRef } from "react";
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
import moment from "moment";
import DatePicker from "react-datepicker";

function TaskBox({ task, setTasks, allTasks }) {
  const { userTasks, setUserTasks, setCriticalTasks,events, setEvents } = useContext(UserContext);
  const [inProgressTask, setInProgressTask] = useState("Start Task");
  const [completedState, setCompletedState] = useState("Finish");
  const [activeBtn, setActiveBtn] = useState(false);
  const [editTitleInputs, setTitleEditsInput] = useState(false);
  const [editDescriptionInputs, setDescriptionEditInput] = useState(false);
  const [editDateInputs, setDateEditsInput] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const[date ,setDate] = useState("")
  const titleInputRefs = useRef([])
  const desInputRefs = useRef([])
  const indexRef = useRef(null)

  // FUNCTION TO CLICK ON PENCIL , SO TASK CAN BE EDITED
  const editUserTitleInputs = (index) => {
    setTitleEditsInput(true);
    titleInputRefs.current[index]?.focus();
      indexRef.current = index;
  };
  const editUserDescriptionInputs = (index) => {
    setDescriptionEditInput(true);
    desInputRefs.current[index]?.focus();
     indexRef.current = index;
  };
  const editUserDateInputs = (tas) => {
    setDateEditsInput(true);
  };

  const editTitle = (event, tas) => {
    const updatedTask = task.map((completeTas) =>
      completeTas.$id === tas.$id
        ? { ...tas, title: event.target.value }
        : completeTas
    );
    setTasks(updatedTask);
    setTitle(event.target.value);
  };

  const editDescription = (event, tas) => {
    const updatedTask = task.map((completeTas) =>
      completeTas.$id === tas.$id
        ? { ...tas, taskDescription: event.target.value }
        : completeTas
    );
    setTasks(updatedTask);
    setDescription(event.target.value);
  };

  const weekend = (date) => new Date() < date;
  

   useEffect(()=>{
    titleInputRefs.current[indexRef.current]?.focus();
    desInputRefs.current[indexRef.current]?.focus();
  },[editTitleInputs,editDescriptionInputs])

  // Button to Update Title
  const updateTitle= async (tas) => {
    try {
      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        tas.$id,
        {
          title: title,
        }
      );
      setTitleEditsInput(false);
      // Step 1: Retrieve the array from localStorage
const storedArray = JSON.parse(localStorage.getItem("userTasks"));
// Step 2: Find and modify the specific item in the array
const itemToUpdate = storedArray.map((item) => {
  if (item.$id === tas.$id) {
    return { ...tas, title:title }
  }
  return item; // Return the original item for other items in the array
});
// Step 3: Update the array in localStorage
localStorage.setItem("userTasks", JSON.stringify(itemToUpdate))
const newEvents = itemToUpdate.map((doc) => ({
  start: doc.dueDate,
  end: doc.dueDate,
  title: doc.title,
  priority: doc.priority,
}));
setEvents(newEvents);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Button to Update Description
  const updateDescription= async (tas) => {
    try {
      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        tas.$id,
        {
          taskDescription:description,
        }
      );
      setDescriptionEditInput(false);
      // Step 1: Retrieve the array from localStorage
const storedArray = JSON.parse(localStorage.getItem("userTasks"));
// Step 2: Find and modify the specific item in the array
const itemToUpdate = storedArray.map((item) => {
  if (item.$id === tas.$id) {
    return { ...tas, taskDescription: description }
  }
  return item; // Return the original item for other items in the array
});
// Step 3: Update the array in localStorage
localStorage.setItem("userTasks", JSON.stringify(itemToUpdate))
    } catch (error) {
      console.log(error.message);
    }
  };


  // FUNCTION TO COMPLETE TASK WHEN BUTTON IS CLICKED
  const completeTaskFunction = async (tas) => {
    try {
      const updatedTask = task.map((completeTas) =>
        completeTas.$id === tas.$id
          ? { ...tas, status: "Completed" }
          : completeTas
      );

      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        tas.$id,
        {
          status: "Completed",
        }
      );

      setCompletedState("Completed");
      setTasks(updatedTask);
      setActiveBtn(true);
// Step 1: Retrieve the array from localStorage
const storedArray = JSON.parse(localStorage.getItem("userTasks"));
// Step 2: Find and modify the specific item in the array
const itemToUpdate = storedArray.map((item) => {
  if (item.$id === tas.$id) {
    return { ...tas, status: "Completed" }
  }
  return item; // Return the original item for other items in the array
});
// Step 3: Update the array in localStorage
localStorage.setItem("userTasks", JSON.stringify(itemToUpdate))
    } catch (error) {
      console.log(error);
    }
  };

  // Function to start task, when the Start button is clicked
  const inProgressFunction = async (tas) => {
    try {
      const updatedTask = task.map((completeTas) =>
        completeTas.$id === tas.$id
          ? { ...tas, status: "In Progress" }
          : completeTas
      );
      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        tas.$id,
        {
          status: "In Progress",
        }
      );
      setInProgressTask("In Progress");
      setTasks(updatedTask);
      //  Retrieve the array from localStorage
const storedArray = JSON.parse(localStorage.getItem("userTasks"));
//  Find and modify the specific item in the array
const itemToUpdate = storedArray.map((item) => {
  if (item.$id === tas.$id) {
    return { ...tas, status: "In Progress" }
  }
  return item; // Return the original item for other items in the array
});
//  Update the array in localStorage
localStorage.setItem("userTasks", JSON.stringify(itemToUpdate))
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete task
  const deleteTask = async (id) => {
    try {
      const deleted = await databases.deleteDocument(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        id
      );
      const remainingTask = task.filter((delTask) => delTask.$id !== id);
      setTasks(remainingTask);
      localStorage.setItem("userTasks", JSON.stringify(remainingTask))
    } catch (error) {
      console.log(error);
    }
  };

  // function to cancel edit
  const cancelTitleEdit = (tas)=>{
    task.map((myTask)=>{
      if(myTask.$id === tas.$id){
        setTitle(tas.title)
        setTitleEditsInput(false);
      }
    })
  }
  // function to cancel edit
  const cancelDescriptionEdit = (tas)=>{
    task.map((myTask)=>{
      if(myTask.$id === tas.$id){
        setTitle(tas.description)
       setDescriptionEditInput(false);
      }
    })
  }

  async function selectDate(date,tas){
    const updatedTask = task.map((completeTas) =>
    completeTas.$id === tas.$id ? {...tas, dueDate: date } : completeTas
  );
  setTasks(updatedTask);
    try {
      await databases.updateDocument(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        tas.$id,
        {
          dueDate:date,
        }
      );
     // Step 1: Retrieve the array from localStorage
const storedArray = JSON.parse(localStorage.getItem("userTasks"));
// Step 2: Find and modify the specific item in the array
const itemToUpdate = storedArray.map((item) => {
  if (item.$id === tas.$id) {
    return { ...tas, dueDate: date}
  }
  return item; // Return the original item for other items in the array
});
// Step 3: Update the array in localStorage
localStorage.setItem("userTasks", JSON.stringify(itemToUpdate))
const newEvents = itemToUpdate.map((doc) => ({
  start: doc.dueDate,
  end: doc.dueDate,
  title: doc.title,
  priority: doc.priority,
}));
setEvents(newEvents);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="mt-16 text-sm">
      {task.map((tas,index) => (
        <div
          className="mt-10 border rounded-md shadow-md items-center"
          key={tas.$id}
        >
          <div className="border-b py-2 pl-5">
            <p className="font-semibold">Task</p>
            <div className="flex items-center justify-between">
              {editTitleInputs ? (
                <input
                ref={(inputRef) => (titleInputRefs.current[index] = inputRef)}
                  value={tas.title}
                  type="text"
                  onChange={(event) => editTitle(event, tas)}
                  className="border border-gray-50 outline-none w-3/6 p-2 focus:border"
                ></input>
              ) : (
                <p>{tas.title}</p>
              )}
              <BsPencil
                onClick={()=>editUserTitleInputs(index)}
                className="mr-5 cursor-pointer hover:text-lg transition duration-500 ease-in-out"
              />
            </div>
            <div className=" flex w-2/12 justify-between">
            <button
              onClick={() => updateTitle(tas)}
              className="bg-deep-blue text-white text-xs px-2 py-1 mt-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => cancelTitleEdit(tas)}
              className="bg-red text-white text-xs px-2 py-1 mt-2 rounded-md"
            >
              Cancel
            </button>
            </div>
          </div>

          <div className="border-b py-4 pl-5">
            <p className="font-semibold">Description</p>
            <div className="flex items-center justify-between">
              {editDescriptionInputs ? (
                <textarea
                rows="5"
                cols="80"
                ref={(inputRef) => (desInputRefs.current[index] = inputRef)}
                  value={tas.taskDescription}
                  type="text"
                  onChange={(event) => editDescription(event, tas)}
                  className="border border-gray-50 outline-none p-2 focus:border overflow-hidden"
                ></textarea>
              ) : (
                <p className = "max-w-lg">{tas.taskDescription}</p>
              )}
              <BsPencil
                onClick={()=>editUserDescriptionInputs(index)}
                className="mr-5 cursor-pointer hover:text-lg transition duration-500 ease-in-out"
              />
            </div>
            <div className=" flex w-2/12 justify-between">
            <button
              onClick={() => updateDescription(tas)}
              className="bg-deep-blue text-white text-xs px-2 py-1 mt-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => cancelDescriptionEdit(tas)}
              className="bg-red text-white text-xs px-2 py-1 mt-2 rounded-md"
            >
              Cancel
            </button>
            </div>
          </div>
          <div className="border-b py-4 pl-5 ">
            <p className="font-semibold">Due Date</p>
            <div className="flex items-center justify-between">
            
              <DatePicker
                selected={new Date(tas.dueDate)}
                filterDate={weekend}
                onChange={(date)=>selectDate(date,tas)}
              />
             
            </div>
          </div>
          <div className="flex justify-between items-center border-b py-4 pl-5 ">
            
            <div className="w-3/12 flex justify-between">
              <button
                disabled={tas.status === "Completed" && activeBtn}
                className={` text-white p-2 rounded-md transition duration-500 ease-in-out ${
                  tas.status === "Completed" ? "bg-gray-2" : "bg-purple-4"
                }`}
                onClick={() => inProgressFunction(tas)}
              >
               
                {tas.status === "In Progress" ? "In Progress" : "Start Task"}
              
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
            <div className="pr-5">
              <AiFillDelete
                onClick={() => deleteTask(tas.$id)}
                className="ml-5 text-red text-xl cursor-pointer hover:text-2xl transition duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskBox;
