import {useQuery} from "@tanstack/react-query";
import {listPacientesGET} from "../../services/PacienteService.ts";
import {Page500} from "../Page500.tsx";
import {format_date} from "../../helpers/helpers.ts";

export const ListadoPacientes = () => {

    const {data, isLoading, isError} = useQuery({
        queryKey: ["listPacientes"],
        queryFn: () => listPacientesGET(),
        refetchOnWindowFocus: false,
        retry: 1
    });

    if (isLoading) {
        return <div>
            <div className="flex items-center justify-center w-full">
                <img src="/imgs/Spiner%20Carga%20Gif.gif" alt="Spinner de carga" className="max-h-14"/>
            </div>
        </div>;
    }

    if (isError) {
        return <Page500/>
    }

    return (
        <>
            <div className="flex justify-center gap-4 items-center">
                <h2 className="text-center text-4xl font-semibold">Listado de Pacientes</h2>
                <img src="/imgs/Icono_Sencillo.png" alt="Pata de perro" className="max-h-32"/>
            </div>
            {data.pacientes?.length > 0 ? (
                data.pacientes.map((paciente) => (
                    <>
                        <div key={paciente._id} className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
                            <p className="font-semibold uppercase text-indigo-700 my-2">Nombre: <span className="font-normal normal-case text-black ">{paciente.nombre}</span></p>
                            <p className="font-semibold uppercase text-indigo-700 my-2">Propietario: <span className="font-normal normal-case text-black ">{paciente.propietario}</span></p>
                            <p className="font-semibold uppercase text-indigo-700 my-2">Email: <span className="font-normal normal-case text-black ">{paciente.email_propietario}</span></p>
                            <p className="font-semibold uppercase text-indigo-700 my-2">Telefono: <span className="font-normal normal-case text-black ">{paciente.telefono_propietario}</span></p>
                            <p className="font-semibold uppercase text-indigo-700 my-2">Fecha Ingreso: <span className="font-normal normal-case text-black ">{format_date(paciente.fecha_ingreso)}</span></p>
                            <p className="font-semibold uppercase text-indigo-700 my-2">Sintomas: <span className="font-normal normal-case text-black ">{paciente.sintomas}</span></p>
                            <p className="font-semibold uppercase text-indigo-700 my-2">Estatus: <span className="font-normal normal-case text-black ">{paciente.status}</span></p>
                            <div className="flex flex-col md:flex-row justify-around items-center mt-5">
                                <button className="bg-indigo-500 hover:bg-indigo-700 font-semibold cursor-pointer transition-colors duration-500 uppercase text-white px-10 py-2 rounded-lg">
                                    Editar
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 font-semibold cursor-pointer transition-colors duration-500 uppercase text-white px-10 py-2 rounded-lg">Eliminar</button>
                            </div>
                        </div>
                    </>
                ))
            ) : (
                <>
                    <h2 className="text-center text-xl">No tienes pacientes disponibles</h2>
                </>
            )}
        </>
    );
}