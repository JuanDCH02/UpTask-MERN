import { addUserToProject } from "@/services/TeamApi"
import type { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { AiOutlineUserAdd } from 'react-icons/ai';


type SearchResultProps = {
    user: TeamMember
    reset:()=> void
}

export default function SearchResult({user, reset} : SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn:addUserToProject,
        onError:(error) => {
            toast.error(error.message)
        },
        onSuccess:(data) => {
            toast.success(data, {icon: <AiOutlineUserAdd className="text-lg"/>}) 
            queryClient.invalidateQueries({queryKey:['ProjectTeam', projectId]})
            reset()
        }
    })
    const handleAddUserToProject = () => {
        const data = { projectId, id:user._id }
        mutate(data)
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button className="text-purple-600 hover:bg-purple-200 px-10 py-3 font-bold cursor-pointer"
                    onClick={handleAddUserToProject}
                    >Agregar al proyecto
                </button>
            </div>
        </>
    )
}
