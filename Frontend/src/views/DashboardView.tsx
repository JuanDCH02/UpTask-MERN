import { Link } from "react-router-dom"

export default function () {
    return (
    <>
        <h1 className="text-5xl font-black">Mis Proyectos</h1>
        <p className="text-2xl font-light">Maneja y administra tus Proyetos</p>
        <nav className="my-5">
            <Link to={'/projects/create'} 
            className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white font-bold cursor-pointer transition-colors"
                >Nuevo Proyecto
            </Link>
        </nav>
    </>
  )
}
