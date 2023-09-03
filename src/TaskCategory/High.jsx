import { useContext } from "react"
import { UserContext } from "../App"
import TaskBox from "./TaskBox"
function High() {
    const {highTasks,setHighTasks} = useContext(UserContext)
  return (
    <section className="lg:w-8/12 px-4">
       <h2 className="mt-5 text-xl font-semibold">High Tasks</h2>
       <TaskBox task = {highTasks} setTasks={setHighTasks}/>
    </section>
  )
}

export default High