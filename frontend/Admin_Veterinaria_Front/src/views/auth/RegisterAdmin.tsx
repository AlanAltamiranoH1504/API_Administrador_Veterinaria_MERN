import {useForm} from "react-hook-form";
import type {FormRegister} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {registerVeterinarioFunction} from "../../services/AuthService.ts";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";

export const RegisterAdmin = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<FormRegister>();
    const navigate = useNavigate();
    function registerFunction(data: FormRegister) {
        registerVeterinarioMutation.mutate(data);
    }
    const registerVeterinarioMutation = useMutation({
        mutationKey: ["registerVeterinario"],
        mutationFn: registerVeterinarioFunction,
        onSuccess: () => {
            toast.success("Usuario registrado! Confirma tu cuenta.")
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
                    <img src="/imgs/Logtipo_2.png" alt={"Logotipo"} />
                </div>

                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm border w-full max-w-xl">
                    <form onSubmit={handleSubmit(registerFunction)}>
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
                            <label className="mb-2 block uppercase text-gray-600 font-bold">Password:</label>
                            <input type={"password"} {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 8,
                                    message: "Debe ser de al menos 8 caracteres"
                                },
                                // pattern: {
                                //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
                                //     message: "Debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo"
                                // }
                            })} className={"border p-3 w-full rounded-lg"} placeholder="Minimo 8 caracteres"/>
                            <div className="bg-red-100 text-red-600 font-semibold mt-2 rounded-sm text-center">
                                {errors.password && String(errors.password.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <input type={"submit"} value="Registrarse" className="w-full px-3 py-2 border rounded-lg bg-indigo-600 text-lg text-white font-semibold cursor-pointer hover:bg-indigo-700 transition-colors duration-500"/>
                        </div>

                        <div className="flex flex-row justify-around">
                            <Link to="/" className="text-gray-500 text-sm hover:text-indigo-500 transition-colors duration-500">Iniciar Sesion</Link>
                            <Link to="/forget-password" className="text-gray-500 text-sm  hover:text-indigo-500 transition-colors duration-500">Olvide mi contraseña</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}