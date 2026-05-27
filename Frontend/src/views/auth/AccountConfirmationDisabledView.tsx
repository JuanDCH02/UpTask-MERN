import { Link } from "react-router-dom";

export default function AccountConfirmationDisabledView() {
    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirmacion desactivada</h1>
            <p className="text-2xl font-light text-white mt-5">
                Tu cuenta ya no necesita un codigo de confirmacion para comenzar.
                <span className="text-fuchsia-500 font-bold"> Puedes iniciar sesion directamente.</span>
            </p>

            <div className="space-y-6 p-10 bg-white mt-10">
                <p className="text-lg text-slate-700 leading-relaxed">
                    Si vienes de un enlace antiguo de activacion, no necesitas hacer nada mas.
                    Entra con tu email y password para acceder a tus proyectos.
                </p>

                <div className="grid gap-4">
                    <Link
                        to="/auth/login"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl text-center"
                    >
                        Ir a iniciar sesion
                    </Link>
                    <Link
                        to="/auth/forgot-password"
                        className="text-center text-slate-600 font-semibold"
                    >
                        Necesitas recuperar tu password?
                    </Link>
                </div>
            </div>
        </>
    )
}
