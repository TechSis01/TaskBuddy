
import { useContext } from "react"
import { UserContext } from "../App"
import TaskBox from "./TaskBox"
function Low() {
    const {lowTasks,setLowTasks} = useContext(UserContext)
  return (
    <section className="lg:w-8/12 px-4">
        <h2 className="mt-5 text-xl font-semibold">Low Tasks</h2>
        <TaskBox task = {lowTasks} setTasks={setLowTasks}/>
    </section>
  )
}


export default Low