import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/services/projectApi"

export default function () {

    const {data, isError, isLoading} = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    })

    if(data)return (
    <>
        <h1 className="text-5xl font-black text-shadow-lg/20">Mis Proyectos</h1>
        <p className="text-2xl font-light">Maneja y administra tus Proyetos</p>
        <nav className="my-5">
            <Link to='/projects/create' 
            className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white font-bold cursor-pointer transition-colors"
                >Nuevo Proyecto
            </Link>
        </nav>

        {data.length ? (
            data.map(project => (
            <p>{project.projectName}</p>
        ))
        ) : (
            <p className="text-center text-2xl text-gray-500 py-20 italic">No Hay Proyectos Disponibles.
                <Link
                    to='/projects/create'
                    className="text-fuchsia-500 font-bold not-italic text-shadow-lg/20"
                > Crear Proyecto
                </Link>
            </p>
        )}
    </>
  )
}
