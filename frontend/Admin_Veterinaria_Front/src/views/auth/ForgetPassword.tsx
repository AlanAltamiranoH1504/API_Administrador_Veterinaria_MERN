import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import type {FormForgetPassword} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {forgePasswordFunction} from "../../services/AuthService.ts";
import {toast} from "react-toastify";

export const ForgetPassword = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<FormForgetPassword>();

    function forgetPasswordLocal(data: FormForgetPassword) {
        forgetPasswordMutation.mutate(data);
    }

    const forgetPasswordMutation = useMutation(({
        mutationKey: ["forgetPasswordVeterinario"],
        mutationFn: forgePasswordFunction,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.success(error.message);
        }
    }))

    return (
        <>
            <div className="md:flex md:items-center md:justify-center min-h-screen px-4 gap-8">
                <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                    <img src="/imgs/Icon_AV.png"  alt="Logotipo"/>
                </div>

                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm border w-full max-w-xl">
                    <div className="flex items-center justify-center">
                        <img src="/imgs/Icono_Sencillo.png" alt="Icono Huella Perro" className="max-h-32"/>
                    </div>
                    <h2 className="text-center text-4xl font-bold mb-10">¿Olvidaste tu contraseña? Recuperala con tu email</h2>

                    <form onSubmit={handleSubmit(forgetPasswordLocal)}>
                        <div className="mb-5">
                            <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Email de Registro:</label>
                            <input type={"email"} {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email no valido"
                                }
                            })} className="border p-3 w-full rounded-lg" placeholder="Ej: correo@gmail.com"/>

                            <div className="bg-red-100 text-red-600 text-center font-semibold text-sm mt-2">
                                {errors.email && String(errors.email.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <input type="submit" value={"Enviar Instrucciones"} className="w-full px-3 py-2 rounded-lg border font-semibold bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-500"/>
                        </div>
                    </form>

                    <div className="flex flex-row justify-around">
                        <Link to="/register" className="text-gray-500 text-sm hover:text-indigo-500 transition-colors duration-500">Crear Cuenta</Link>
                        <Link to="/" className="text-gray-500 text-sm  hover:text-indigo-500 transition-colors duration-500">Inciar Sesión</Link>
                    </div>
                </div>
            </div>
        </>
    )
}