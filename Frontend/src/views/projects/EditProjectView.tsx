import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/services/projectApi"
import EditProjectForm from "@/components/projects/EditProjectForm"

export default function EditProjectView() {

    //contains the param from the url
    const {projectId} = useParams()
    const {data, isError, isLoading} = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId!),    
    })
    if(isLoading) return 'cargando...'
    if(isError) return <Navigate to='/404' /> 
    if(data ) return <EditProjectForm data={data} projectId={projectId!} />

    return (
        <div>EditProjectView</div>
    )
}
 