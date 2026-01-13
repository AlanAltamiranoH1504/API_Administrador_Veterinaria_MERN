import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import type {FormConfirmPassword} from "../../types";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {saveNewPasswordFunction} from "../../services/AuthService.ts";

export const SaveNewPasswordView = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<FormConfirmPassword>();
    function updatePasswordFunction(data: FormConfirmPassword) {
        if (data.password_confirmation !== data.password) {
            toast.error("Las password no coinciden");
            return;
        }
        const data_password: FormConfirmPassword = {
            ...data,
            token: id!
        }
        confirmNewPasswordMutation.mutate(data_password);
    }

    const confirmNewPasswordMutation = useMutation({
        mutationKey: ["confirmNewPassword"],
        mutationFn: saveNewPasswordFunction,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/")
        },
        onError: () => {
            toast.error("Ocurrio un error en actualizacion de password");
        }
    })
    return (
        <>
            <div className="md:flex md:items-center md:justify-center min-h-screen px-4 gap-8">
                <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                    <img src="/imgs/Icono_Sencillo.png" alt="Logo confirmacion"/>
                </div>

                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm border w-full max-w-xl">
                    <div className="flex items-center justify-center">
                        <img src="/imgs/Cara_perro.png" alt="Logo" className="max-h-32"/>
                    </div>

                    <h2 className="text-center text-4xl font-bold mb-10">Actualiza tu Contraseña</h2>
                    <form onSubmit={handleSubmit(updatePasswordFunction)}>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">Contraseña</label>
                            <input type="password" {...register("password", {
                                required: "El password es obligatorio",
                                minLength: {
                                    value: 5,
                                    message: "Debe tener al menos 5 caracteres"
                                }
                            })} className="border w-full px-3 py-2 rounded-lg" placeholder="Minimo 5 caracteres"/>
                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.password && String(errors.password.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">Confirma Contraseña</label>
                            <input type="password" {...register("password_confirmation", {
                                required: "El password es obligatorio",
                            })} className="border w-full px-3 py-2 rounded-lg" placeholder="Minimo 5 caracteres"/>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">Codigo de confirmación</label>
                            <input type="text" {...register("six_digit_token", {
                                required: "El token es obligatorio",
                                minLength: {
                                    value: 6,
                                    message: "La longitud minima no es correcta"
                                },
                                maxLength: {
                                    value: 6,
                                    message: "La longitud maxima no es correcta"
                                }
                            })} className="border w-full px-3 py-2 rounded-lg" placeholder="Ej. 648755"/>

                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.six_digit_token && String(errors.six_digit_token.message)}
                            </div>
                        </div>
                        <input type={"submit"} className="px-3 w-full border rounded-lg py-2 bg-indigo-500 hover:bg-indigo-700 cursor-pointer transition-colors duration-500 text-white font-semibold" value="Actualizar Password"/>
                    </form>
                </div>
            </div>
        </>
    );
}