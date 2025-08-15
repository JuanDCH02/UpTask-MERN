import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/services/projectApi"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"


export default function ProjectDetailView() {

    const navigate = useNavigate()

    //contains the param from the url
    const {projectId} = useParams()
    const {data, isError, isLoading} = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId!),
    })
    if(isLoading) return 'cargando...'
    if(isError) return <Navigate to='/404' /> 
    if(data ) return (
    <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

        <nav className="my-5 flex gap-3">
            <button type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white cursor-pointer
            transition-colors"
            onClick={()=> navigate('?newTask=true')} 
                >Agregar tarea           
            </button>
        </nav>
        <TaskList
            tasks={data.tasks}
        />
        <AddTaskModal/>
    </>
    )
   
 
}
