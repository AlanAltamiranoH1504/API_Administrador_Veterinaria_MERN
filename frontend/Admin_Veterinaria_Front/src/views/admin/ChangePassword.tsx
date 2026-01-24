import {AdminNav} from "../../components/admin/AdminNav.tsx";
import {useForm} from "react-hook-form";
import type {FormChangePassword} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {changePasswordPUT} from "../../services/VeterinarioService.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const ChangePassword = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormChangePassword>();
    const navigate = useNavigate();
    function changePassword(data: FormChangePassword) {
        if (data.confirm_password !== data.new_password) {
            toast.error("Las passwords no coinciden");
            return;
        }
        changePasswordMutation.mutate(data);
    }

    const changePasswordMutation = useMutation({
        mutationKey: ["changePassword"],
        mutationFn: changePasswordPUT,
        onError: (error) => {
            if (Array.isArray(error)) {
                error.forEach((error) => {
                    toast.error(error);
                });
                return;
            }
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            setTimeout(() => {
                navigate("/admin");
            }, 2000);
        }
    })

    return (
        <>
            <AdminNav/>
            <h2 className="font-semibold text-3xl mt-5">Cambiar Password</h2>
            <div className="md:flex md:items-center md:justify-center min-h-screen px-4 gap-8">
                <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                    <img src="/imgs/Logtipo_2.png" alt={"Logotipo"}/>
                </div>

                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm border w-full max-w-xl">
                    <form onSubmit={handleSubmit(changePassword)}>
                        <div className="flex items-center justify-center">
                            <img src="/imgs/Cara_perro.png" className="max-h-44" alt="Cara de perro"/>
                        </div>

                        <div className="mb-5">
                            <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Antigua
                                Contraseña:</label>
                            <input {...register("old_password", {
                                required: "El password antiguo es obligatorio"
                            })} type={"password"} className="border p-3 w-full rounded-lg"
                                   placeholder="Antigua Contraseña"/>

                            <div
                                className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">{errors.old_password && String(errors.old_password.message)}</div>
                        </div>

                        <div className={"mb-5"}>
                            <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Contraseña:</label>
                            <input type="password" {...register("new_password", {
                                required: "Nuevo password obligatorio"
                            })} className="border p-3 w-full rounded-lg" placeholder="Minimo 6 caracteres"/>
                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.new_password && String(errors.new_password.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-bold">Confirmación de
                                Contraseña:</label>
                            <input type={"password"} {...register("confirm_password", {
                                required: "Cofirmacion obligatoria"
                            })} className="border p-3 w-full rounded-lg" placeholder="Confirmación"/>
                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.confirm_password && String(errors.confirm_password.message)}
                            </div>
                        </div>


                        <div className="mb-5">
                            <input type={"submit"} value="Actualizar Contraseña"
                                   className="w-full px-3 py-2 border rounded-lg bg-indigo-600 text-lg text-white font-semibold cursor-pointer hover:bg-indigo-700 transition-colors duration-500"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}