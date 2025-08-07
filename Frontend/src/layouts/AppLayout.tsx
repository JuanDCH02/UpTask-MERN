import { Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { Toaster } from "sonner"

export default function AppLayout() {
  return (
    <>
    <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-around items-center">

            <div className="w-64 flex items-center gap-14">
                <Logo />
            </div>
                <NavMenu />
        </div>
    </header>

    <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet/>
    </section>

    <footer className="py-5 ">
        <p className="text-center">
            Todos los Derechos Reservados {new Date().getFullYear()} 
        </p>
    </footer>
    <Toaster
        //  icons={{
        //      success: <SuccessIcon />,
        //      info: <InfoIcon />,
        //      warning: <WarningIcon />,
        //      error: <ErrorIcon />,
        //      loading: <LoadingIcon />,
        //  }}
        swipeDirections={['right', 'bottom']}
        position="bottom-right"
        duration={3000}
    />
    </>
  )
}
