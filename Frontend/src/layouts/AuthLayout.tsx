import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

export default function AuthLayout() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen">
                <div className="py-10 lg:py-20 mx-auto w-[450px] ">
                    <Logo/>

                    <div className="mt-10">
                        <Outlet/>
                    </div>

                </div>
            </div>
            <Toaster
                swipeDirections={['right', 'bottom']}
                position="bottom-right"
                duration={3000}
            />

        </>
    )
}
