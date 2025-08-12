import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Project, ProjectFormData } from "@/types/index"
import { UpdateProject } from "@/services/projectApi"
import { toast } from "sonner"
import { FaPenToSquare } from 'react-icons/fa6';

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps ) {
    const navigate = useNavigate()
 
    const {register, handleSubmit, formState:{errors}} = useForm<ProjectFormData>({defaultValues:{
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description 
    }})
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: UpdateProject,
        onError:(error) => {
            toast.error(error.message)
        },
        onSuccess:(data, {formData}) => {
            //when made changes to a project, must do a new query
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            toast.success(data, {description:formData.projectName, icon:<FaPenToSquare/>}) 
            navigate('/')
        }
    })
    const handleForm = (formData: ProjectFormData) =>{
        const data = { formData, projectId}
        mutate(data)
    }

    return (
    <>
    <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="text-2xl font-light">Llena el siguiente formulario para editar el proyecto</p>
        <nav className="my-5">
            <Link to='/' 
            className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white font-bold cursor-pointer transition-colors"
                >Volver a Proyectos
            </Link>
        </nav>

        <form action="" method=""
            className="mt-10 bg-white shadow-lg p-10 rounded-lg"
            onSubmit={handleSubmit(handleForm)}
            noValidate
        >
            <ProjectForm
            register={register}
            errors={errors}
            />
            <input type="submit"
                value='Guardar Cambios'
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white 
                uppercase font-bold cursor-pointer transition-colors"
            />
        </form>
    </div>
    </>
  )
}
