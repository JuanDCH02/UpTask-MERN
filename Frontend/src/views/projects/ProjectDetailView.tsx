import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/services/projectApi"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetail from "@/components/tasks/TaskModalDetail"


export default function ProjectDetailView() {

    const navigate = useNavigate()

    //contains the param from the url
    const {projectId} = useParams()
    const {data, isError, isLoading} = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectById(projectId!),
    })
    if(isLoading) return 'cargando...'
    if(isError) return <Navigate to='/404' /> 
    if(data ) return (
    <>
        <h1 className="text-5xl font-black capitalize text-shadow-lg/20">{data.projectName}</h1>
        <p className="text-2xl font-medium text-gray-500 mt-2">{data.description}</p>

        <nav className="my-5 flex gap-3">
            <button type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white cursor-pointer
            transition-colors"
            onClick={()=> navigate('?newTask=true')} 
                >Agregar tarea           
            </button>
            
            <Link to={'team'}
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white cursor-pointer
            transition-colors"
                >Colaboradores
            </Link>
        </nav>
        <TaskList
            tasks={data.tasks}
        />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetail />
    </>
    )
   
 
}
