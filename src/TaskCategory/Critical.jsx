import { useEffect,useContext,useState} from "react"
import { UserContext } from "../App"
import TaskBox from "./TaskBox"
import { client } from "../services/appwriteConfig"

function Critical() {
  const[text,setText]=useState("Critical Tasks")
  const {criticalTasks,setCriticalTasks,userTasks,setUserTasks} = useContext(UserContext)  

  useEffect(()=>{
    const criticalArrayString = localStorage.getItem('userTasks');
    // Parse the JSON string back into an array and set it in state
    if (criticalArrayString) {
      const storedArray = JSON.parse(criticalArrayString);
      let filteredTask = storedArray.filter((myTasks)=>{
        return myTasks.priority === "Critical"
      })
      setCriticalTasks(filteredTask);
    }
  },[])

  return (
    <section className="lg:w-8/12 px-4">
        <h2 className="mt-5 text-xl font-semibold">{text}</h2>
        <TaskBox task ={criticalTasks} setTasks={setCriticalTasks} allTasks={userTasks} />    
    </section>
  )
}

export default Critical