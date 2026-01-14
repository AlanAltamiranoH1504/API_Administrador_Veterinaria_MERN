import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import type {FormLoginAccount} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {loginFunction} from "../../services/AuthService.ts";
import {toast} from "react-toastify";

export const LoginAdmin = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<FormLoginAccount>();
    const navigate = useNavigate();

    function loginFunctionLocal(data: FormLoginAccount) {
        loginMutation.mutate(data);
    }

    const loginMutation = useMutation({
        mutationKey: ["loginVeterinario"],
        mutationFn: loginFunction,
        onSuccess: (data) => {
            toast.success("¡Bievenido!");
            localStorage.setItem("jwt_veterinaria", data.token);
            navigate("/admin");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
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
                    <h2 className="text-center text-4xl font-bold mb-10">Inicia sesión y administra tus pacientes</h2>

                    <form onSubmit={handleSubmit(loginFunctionLocal)}>
                        <div className="mb-5">
                            <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Email de Registro:</label>
                            <input type={"email"} {...register("email", {
                                required: "El email obligatorio"
                            })} className="border p-3 w-full rounded-lg" placeholder="Ej: correo@gmail.com"/>

                            <div className="bg-red-100 mt-2 text-red-600 text-center text-sm font-semibold">
                                {errors.email && String(errors.email.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Password:</label>
                            <input type={"password"} {...register("password", {
                                required: "El password es obligatoria"
                            })} className="border p-3 w-full rounded-lg" placeholder="*****"/>

                            <div className="bg-red-100 mt-2 text-red-600 text-center text-sm font-semibold">
                                {errors.password && String(errors.password.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <input type="submit" value={"Iniciar Sesión"} className="w-full px-3 py-2 rounded-lg border font-semibold bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-500"/>
                        </div>
                    </form>

                    <div className="flex flex-row justify-around">
                        <Link to="/register" className="text-gray-500 text-sm hover:text-indigo-500 transition-colors duration-500">Crear Cuenta</Link>
                        <Link to="/forget-password" className="text-gray-500 text-sm  hover:text-indigo-500 transition-colors duration-500">Olvide mi contraseña</Link>
                    </div>
                </div>
            </div>
        </>
    );
}