import { useContext,useEffect } from "react"
import { UserContext } from "../App"
import TaskBox from "./TaskBox"
import FileSearch from "../Images/FileS.gif"
function High() {
    const {highTasks,setHighTasks} = useContext(UserContext)

    useEffect(()=>{
      const highArrayString = localStorage.getItem('userTasks');
      // Parse the JSON string back into an array and set it in state
      if (highArrayString) {
        const storedArray = JSON.parse(highArrayString);
        let filteredTask = storedArray.filter((myTasks)=>{
          return myTasks.priority === "High"
        })
        setHighTasks(filteredTask);
      }
    },[])
  return (
    <section className="lg:w-8/12 px-4">
       <h2 className="mt-5 text-xl font-semibold">High Tasks</h2>
       {highTasks.length === 0 ? (<img src={FileSearch} alt="File Searcher" className="mx-auto"></img>) : (
       <TaskBox task = {highTasks} setTasks={setHighTasks}/>

       )}
    </section>
  )
}

export default High