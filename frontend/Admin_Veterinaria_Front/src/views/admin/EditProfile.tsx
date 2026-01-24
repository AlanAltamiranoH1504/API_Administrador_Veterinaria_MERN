import {AdminNav} from "../../components/admin/AdminNav.tsx";
import {useForm} from "react-hook-form";
import type {FormEditProfile, UserInSession} from "../../types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {updateVeterinarioPUT} from "../../services/VeterinarioService.ts";
import {toast} from "react-toastify";

export const EditProfile = () => {
    const {register, handleSubmit, formState: {errors}, setValue} =  useForm<FormEditProfile>();
    const queryClient = useQueryClient();
    const cacheUserInSession = queryClient.getQueryData<UserInSession>(["userInSession"]);

    function editProfile(data: FormEditProfile) {
        updateProfileMutation.mutate(data);
        queryClient.invalidateQueries({
            queryKey: ["userInSession"]
        });
    }

    const updateProfileMutation = useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: updateVeterinarioPUT,
        onSuccess: () => {
            toast.success("Datos actualizdos correctamente");
        },
        onError: (error) => {
            if (Array.isArray(error)) {
                error.forEach((error) => {
                    toast.error(error);
                });
                return;
            }
            toast.error(error.message);
        }
    })
    useEffect(() => {
        // @ts-ignore
        setValue("nombre", cacheUserInSession!.user!.nombre);
        setValue("apellidos", cacheUserInSession!.user!.apellidos);
        setValue("email", cacheUserInSession!.user!.email);
        setValue("telefono", cacheUserInSession!.user!.telefono);
        // @ts-ignore
        setValue("edad", cacheUserInSession!.user!.edad);
    }, [cacheUserInSession]);

    return (
        <>
            <AdminNav/>
            <h2 className="font-semibold text-3xl mt-5">Edita Tu Perfil</h2>
            <div className="md:flex md:items-center md:justify-center min-h-screen px-4 gap-8">
                <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                    <img src="/imgs/Logtipo_2.png" alt={"Logotipo"} />
                </div>

                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm border w-full max-w-xl">
                    <form onSubmit={handleSubmit(editProfile)}>
                        <div className="flex items-center justify-center">
                            <img src="/imgs/Cara_perro.png" className="max-h-44" alt="Cara de perro"/>
                        </div>

                        <div className="mb-5">
                            <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Nombre:</label>
                            <input {...register("nombre", {
                                required: "El nombre es obligatorio"
                            })} type={"text"} className="border p-3 w-full rounded-lg" placeholder="Nombre de veterinario"/>

                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">{errors.nombre && String(errors.nombre.message)}</div>
                        </div>

                        <div className={"mb-5"}>
                            <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Apellidos:</label>
                            <input type="text" {...register("apellidos", {
                                required: "Los apellidos son obligatorios"
                            })} className="border p-3 w-full rounded-lg" placeholder="Apellidos del veterinario"/>
                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.apellidos && String(errors.apellidos.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-bold">Email de Registro:</label>
                            <input type={"email"} {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value:  /\S+@\S+\.\S+/,
                                    message: "Email no valido"
                                }
                            })} className="border p-3 w-full rounded-lg" placeholder="Email de registro valido"/>
                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.email && String(errors.email.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-bold">Telefono de Veterinario</label>
                            <input type={"text"}
                                   {...register("telefono", {
                                       required: "El telefono es obligatorio",
                                       pattern: {
                                           value: /^[0-9]+$/,
                                           message: "Solo se permiten numeros"
                                       }
                                   })}
                                   className={"border p-3 w-full rounded-lg"} placeholder="Telefono de Contacto"/>
                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.telefono && String(errors.telefono.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-bold">Edad:</label>
                            <input type={"text"}
                                   {...register("edad", {
                                       pattern: {
                                           value: /^[0-9]+$/,
                                           message: "Solo se aceptan numeros"
                                       },
                                       min: {
                                           value: 22,
                                           message: "La edad minima de registro es 22"
                                       },
                                       max: {
                                           value: 100,
                                           message: "Edad de registro no valida"
                                       }
                                   })}
                                   className={"border p-3 w-full rounded-lg"} placeholder="Edad"/>
                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.edad && String(errors.edad.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <input type={"submit"} value="Actualizar Perfil" className="w-full px-3 py-2 border rounded-lg bg-indigo-600 text-lg text-white font-semibold cursor-pointer hover:bg-indigo-700 transition-colors duration-500"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}