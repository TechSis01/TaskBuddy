
import { useContext,useEffect } from "react"
import { UserContext } from "../App"
import TaskBox from "./TaskBox"
function Low() {
    const {lowTasks,setLowTasks} = useContext(UserContext)

    useEffect(()=>{
      const lowArrayString = localStorage.getItem('userTasks');
      // Parse the JSON string back into an array and set it in state
      if (lowArrayString) {
        const storedArray = JSON.parse(lowArrayString);
        let filteredTask = storedArray.filter((myTasks)=>{
          return myTasks.priority === "low"
        })
        setLowTasks(filteredTask);
      }
    },[])

  return (
    <section className="lg:w-8/12 px-4">
        <h2 className="mt-5 text-xl font-semibold">Low Tasks</h2>
        <TaskBox task = {lowTasks} setTasks={setLowTasks}/>
    </section>
  )
}


export default Low