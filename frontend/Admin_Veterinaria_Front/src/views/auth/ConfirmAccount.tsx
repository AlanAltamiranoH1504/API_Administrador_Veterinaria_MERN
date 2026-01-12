import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import type {FormConfirmAccount} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {confirmVeterinarioFunction} from "../../services/AuthService.ts";
import {toast} from "react-toastify";

export const ConfirmAccount = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<FormConfirmAccount>();

    function confirmAccountFunction(data: FormConfirmAccount) {
        const tokens:any = {
            token_confirmacion: id!.toLowerCase(),
            six_digit_token: data.six_digit_token
        }
        confirmAccountMutation.mutate(tokens);
    }

    const confirmAccountMutation = useMutation({
        mutationKey: ["confirmAccount"],
        mutationFn: confirmVeterinarioFunction,
        onSuccess: (data: any) => {
            toast.success(data.message);
            navigate("/");
        },
        onError: (error: any) => {
            toast.error(error.message);
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
                        <img src="/imgs/Cara_perro.png" className="max-h-32"/>
                    </div>

                    <h2 className="text-center text-4xl font-bold mb-10">Ingresa tu Codigo de Confirmación</h2>
                    <form onSubmit={handleSubmit(confirmAccountFunction)}>
                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">Codigo de confirmación</label>
                            <input type="text" {...register("six_digit_token", {
                                required: "El token de confirmacion es obligatorio",
                                maxLength: {
                                    value: 6,
                                    message: "El token debe ser de máximo 6 caracteres"
                                },
                                minLength: {
                                    value: 6,
                                    message: "El token debe ser mínimo de 6 caracteres"
                                }
                            })} className="border w-full px-3 py-2 rounded-lg" placeholder="Ej. 648755"/>

                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.six_digit_token && String(errors.six_digit_token.message)}
                            </div>
                        </div>
                        <input type={"submit"} className="px-3 w-full border rounded-lg py-2 bg-indigo-500 hover:bg-indigo-700 cursor-pointer transition-colors duration-500 text-white font-semibold" value="Confirmar Cuenta"/>
                    </form>
                </div>
            </div>
        </>
    );
}