import ErrorMessage from "@/components/ErrorMessage";
import { createAccount } from "@/services/AuthApi";
import type { UserRegistrationForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterView() {
    const navigate = useNavigate()

    const initialValues: UserRegistrationForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<UserRegistrationForm>({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate("/auth/login")
        },
    })

    const password = watch("password")
    const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Completa el formulario para
                <span className=" text-fuchsia-500 font-bold"> comenzar a gestionar tus proyectos</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-5 p-10 bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de registro"
                        className="w-full p-3 border-gray-300 border"
                        {...register("email", {
                            required: "El email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no valido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">
                        Nombre
                    </label>
                    <input
                        type="text"
                        placeholder="Nombre de registro"
                        className="w-full p-3 border-gray-300 border"
                        {...register("name", {
                            required: "El nombre de usuario es obligatorio",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Password de registro"
                        className="w-full p-3 border-gray-300 border"
                        {...register("password", {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message: "El password debe ser minimo de 8 caracteres"
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">
                        Repetir Password
                    </label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite tu password"
                        className="w-full p-3 border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repetir password es obligatorio",
                            validate: (value) => value === password || "Los passwords no son iguales"
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Registrarme"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer"
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/login"
                    className="text-center text-gray-300 font-normal"
                >
                    Ya tienes cuenta? Iniciar sesion
                </Link>
            </nav>
        </>
    )
}
