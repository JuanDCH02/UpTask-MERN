import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTaskbyId } from '@/services/TaskApi'
import EditTaskModal from './EditTaskModal'

export default function EditTaskData() {

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!

    const {data} = useQuery({
        queryKey:['task', taskId],
        queryFn: () => getTaskbyId({projectId, taskId}),
        enabled: !!taskId
    })

    if(data) return <EditTaskModal/>
}
