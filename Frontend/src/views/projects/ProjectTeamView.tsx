import { Link, useNavigate, useParams } from "react-router-dom"
import AddMemberModal from "@/components/team/AddMemberModal"


export default function ProjectTeamView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    return (
        <>
        
            <h1 className="text-5xl font-black capitalize text-shadow-lg/20">Administrar Equipo</h1>
            <p className="text-2xl font-medium text-gray-500 mt-2">Administra el equipo de trabajo para este proyecto</p>

            <nav className="my-5 flex gap-3">
                <button type="button"
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white cursor-pointer
                transition-colors"
                onClick={()=> navigate('?addMember=true')} 
                    >Agregar colaborador         
                </button>

                <Link to={`/projects/${projectId}`}
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white cursor-pointer
                transition-colors"
                    >Volver al proyeto
                </Link>
            </nav>

            <AddMemberModal/>
        </>
    )
}
