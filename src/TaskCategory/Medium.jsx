
import { useContext,useEffect } from "react"
import { UserContext } from "../App"
import TaskBox from "./TaskBox"
function Medium() {
    const {mediumTasks,setMediumTasks} = useContext(UserContext)
    
    useEffect(()=>{
      const mediumArrayString = localStorage.getItem('userTasks');
      // Parse the JSON string back into an array and set it in state
      if (mediumArrayString) {
        const storedArray = JSON.parse(mediumArrayString);
        let filteredTask = storedArray.filter((myTasks)=>{
          return myTasks.priority === "Medium"
        })
        setMediumTasks(filteredTask);
      }
     
    },[])
    
  return (
    <section className="lg:w-8/12 px-4">
        <h2 className="mt-5 text-xl font-semibold">Medium Priority Tasks</h2>
        <TaskBox task = {mediumTasks} setTasks={setMediumTasks}/>
    </section>
  )
}

export default Medium