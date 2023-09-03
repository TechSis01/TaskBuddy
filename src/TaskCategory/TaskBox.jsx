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
function TaskBox({ task,setTasks,allTasks,realtimeFunc }) {
  const { userTasks,setUserTasks,setCriticalTasks} = useContext(UserContext)
  const navigate = useNavigate();
  
  const [inProgressLoader, setInProgressLoader] = useState(true);
  const [completedState, setCompletedState] = useState("Finish");
 

  const completeTaskFunction = async (tas) => {
   
    const indexOfClickedTask = task.findIndex((completeTas) => completeTas.$id === tas.$id);
    const updatedTask = task.map((completeTas) => {
      if (completeTas.$id === tas.$id) {
        // the spread operator to create a new task object with the updated status
        return { ...tas, status: 'Completed' };
      }}
    )
    console.log(updatedTask[indexOfClickedTask].status)
    setCompletedState(updatedTask[indexOfClickedTask].status)
  console.log(`Index of clicked task: ${indexOfClickedTask}`);
    try {
      let promise = await databases.updateDocument(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        tas.$id,
        {
          status: "Completed",
        }
      );
     if(promise.status === 200){
      console.log("It is done")
     }         
    } catch (error) {
      console.log(error);
    }
    // setInProgressLoader(false);
  };
  
 
  const inProgressFunction = async (tas) => {
    try {
      let promise = await databases.updateDocument(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        tas.$id,
        {
          status: "In Progress",
        }
      );
      navigate("/container/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async(id)=>{
    try{
      const deleted =  await databases.deleteDocument( "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        id)
      let remainingTask = task.filter((delTask)=>{
        return delTask.$id !== id 
      })
      setTasks(remainingTask)
    }
    catch(error){
        console.log(error)
    }

  }
  return (
    <div className="mt-16 text-sm">
      {task.map((tas) => (
        <div
          className="mt-10 border rounded-md shadow-md items-center"
          key={tas.$id}
        >
          <div className="border-b py-4 pl-5">
            <p className="font-semibold">Task</p>
            <div className="flex items-center justify-between">
              <p>{tas.title}</p>
              <BsPencil className="mr-5 cursor-pointer hover:text-lg transition duration-500 ease-in-out" />
            </div>
          </div>
          <div className="border-b py-4 pl-5">
            <p className="font-semibold">Description</p>
            <div className="flex items-center justify-between">
              <p>{tas.taskDescription}</p>
              <BsPencil className="mr-5 cursor-pointer hover:text-lg transition duration-500 ease-in-out" />
            </div>
          </div>
          <div className="border-b py-4  pl-5 ">
            <p className="font-semibold">Due Date</p>
            <div className="flex items-center justify-between">
              <p>{tas.dueDate}</p>
              <BsPencil className="mr-5 cursor-pointer hover:text-lg transition duration-500 ease-in-out" />
            </div>
          </div>
          <div className="flex justify-between items-center border-b py-4  pl-5 ">
            <div className="flex items-center">
              <button className="bg-deep-blue text-white p-2 rounded-md">
                Update
              </button>
              <AiFillDelete onClick = {()=>deleteTask(tas.$id)}className="ml-5 text-red text-xl cursor-pointer hover:text-2xl transition duration-500 ease-in-out" />
            </div>
            <div className="w-4/12 flex justify-around">
              <button
                className="bg-purple-4  text-white p-2 rounded-md transition duration-500 ease-in-out"
                onClick={() => inProgressFunction(tas.$id)}
              >
                <div>
                  {tas.status === "In Progress" && tas.status}
                  {tas.status === "Completed" && <GiCheckMark /> }
                  {tas.status === "Not Started" && "Start"}
                </div>
              </button>

              <button
                className="bg-green text-white p-2 rounded-md transition duration-500 ease-in-out"
                onClick={() => completeTaskFunction(tas)}
              >
               {completedState}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskBox;
