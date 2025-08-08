import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { BsFillCheckSquareFill } from 'react-icons/bs';
import ProjectForm from "@/components/projects/ProjectForm"
import type { ProjectFormData } from "@/types/index"
import { createProject } from "@/services/projectApi"

export default function CreateProjectView() {

    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm<ProjectFormData>({defaultValues: initialValues})
    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data, formData) => {
            toast.success(data, {description:formData.projectName, icon:<BsFillCheckSquareFill/>}) 
            navigate('/')
        }
        
    })

    const handleForm = async (formData: ProjectFormData) => mutate(formData)

    return (
    <>
    <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crea un Proyecto</h1>
        <p className="text-2xl font-light">Llena el siguiente formulario para crear un proyecto</p>
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
                value='Crear Proyecto'
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white 
                uppercase font-bold cursor-pointer transition-colors"
            />
        </form>
    </div>
    </>
    )
}
