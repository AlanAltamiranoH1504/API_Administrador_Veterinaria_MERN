import Modal from "react-modal";
import {useForm} from "react-hook-form";
import type {FindPaciente, FormEditPaciente} from "../../types";
import {useEffect} from "react";

const stylesModal = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        width: "700px"
    }
};

type ModalEditPacientProps = {
    isOpen: boolean,
    closeModal: () => void,
    pacienteAPI: FindPaciente
}
export const ModalEditPacient = ({isOpen, closeModal, pacienteAPI}: ModalEditPacientProps) => {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm<FormEditPaciente>();
    useEffect(() => {
        if (!pacienteAPI?.paciente) return;

        setValue("nombre", pacienteAPI!.paciente!.nombre);
        setValue("propietario", pacienteAPI!.paciente!.propietario);
        setValue("email_propietario", pacienteAPI!.paciente!.email_propietario);
        setValue("telefono_propietario", pacienteAPI!.paciente!.telefono_propietario);
        setValue("sintomas", pacienteAPI!.paciente!.sintomas);
        setValue("status", pacienteAPI!.paciente!.status);
    }, [pacienteAPI, setValue]);

    function updatePacienteLocal() {
        console.log("Actualizando paciente")
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Edición de Paciente"
                style={stylesModal}
            >

                <div className="bg-white p-6 rounded-lg shadow-sm border w-full max-w-full">
                    <h2 className="text-2xl text-center font-semibold capitalize">Edita al Paciente</h2>
                    <div className="flex justify-center items-center">
                        <img src="/imgs/Cara_perro.png" alt="Cara de perro" className="max-h-24"/>
                    </div>

                    <form onSubmit={handleSubmit(updatePacienteLocal)}>
                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">Nombre de
                                Paciente:</label>
                            <input type="text" {...register("nombre", {
                                required: "El nombre es obligatorio"
                            })} className="border px-3 py-2 rounded-lg w-full shadow-sm"
                                   placeholder="Nombre de Mascota"/>
                            <div className="mt-2 text-red-600 bg-red-100 text-sm font-semibold text-center rounded-sm">
                                {errors.nombre && String(errors.nombre.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">Propietario:</label>
                            <input type={"text"} {...register("propietario", {
                                required: "El propietario es obligatorio"
                            })} className="border px-3 py-2 rounded-lg w-full shadow-sm"
                                   placeholder="Nombre de Propietario"/>

                            <div className="mt-2 text-red-600 bg-red-100 text-sm font-semibold text-center rounded-sm">
                                {errors.propietario && String(errors.propietario.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">E-mail de
                                contacto:</label>
                            <input type={"email"} {...register("email_propietario", {
                                required: "El email del propietario es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Formato de correo no valido"
                                }
                            })} className="border px-3 py-2 rounded-lg w-full shadow-sm"
                                   placeholder="E-mail de Propietario"/>

                            <div className="mt-2 text-red-600 bg-red-100 text-sm font-semibold text-center rounded-sm">
                                {errors.email_propietario && String(errors.email_propietario.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">Telefono de
                                contacto:</label>
                            <input type={"text"} {...register("telefono_propietario", {
                                required: "El telefono es obligatorio"
                            })} className="border px-3 py-2 rounded-lg w-full shadow-sm"
                                   placeholder="Telefono de Propietario"/>
                            <div className="mt-2 text-red-600 bg-red-100 text-sm font-semibold text-center rounded-sm">
                                {errors.telefono_propietario && String(errors.telefono_propietario.message)}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">Sintomas del
                                Paciente:</label>
                            <textarea {...register("sintomas", {
                                required: "Los sintomas son obligatorios",
                                max: {
                                    value: 500,
                                    message: "Máximo 500 caracteres"
                                }
                            })} className="border px-3 py-2 w-full rounded-lg shadow-sm" cols={7} rows={7}></textarea>

                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block uppercase text-gray-600 font-semibold">Estatus</label>
                            <select {...register("status", {
                                required: "El estatus es obligatorio"
                            })} className="border px-3 py-2 shadow-sm w-full rounded-lg">
                                <option value="">--- Selecciona una opción ---</option>
                                <option value="Ingreso">Ingreso</option>
                                <option value="Segunda Revisión">Segunda Revisión</option>
                                <option value="Tercera Revisón">Ingreso</option>
                                <option value="Alta">Alta</option>
                                <option value="Seguimiento">Seguimiento</option>
                            </select>
                            <div className="mt-2 text-red-600 bg-red-100 text-sm font-semibold text-center rounded-sm">
                                {errors.status && String(errors.status.message)}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <input type="submit"
                                   className="px-3 py-2 bg-indigo-500 cursor-pointer text-center font-semibold rounded-lg hover:bg-indigo-600 transition-colors duration-500 text-white"
                                   value="Agregar Paciente"/>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}