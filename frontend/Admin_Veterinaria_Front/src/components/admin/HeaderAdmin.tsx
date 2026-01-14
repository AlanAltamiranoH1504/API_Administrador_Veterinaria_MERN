import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const HeaderAdmin = () => {
    const navigate = useNavigate();
    function logout_function() {
        try {
            localStorage.removeItem("jwt_veterinaria");
            navigate("/");
        }catch (e) {
            toast.error("Error en cierre de sesión");
        }
    }

    return (
        <>
            <header className="py-10 bg-indigo-600">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <h1 className="font-bold text-4xl text-indigo-200 text-center">Administrador de Pacientes de <span className="text-white font-black">Veterinaria</span></h1>
                    <nav className="flex gap-4 items-center flex-col lg:flex-row mt-4 lg:mt-0">
                        <Link to="/admin" className="text-white text-lg uppercase font-bold">Pacientes</Link>
                        <Link to="/perfil" className="text-white text-lg uppercase font-bold">Perfil</Link>
                        <button onClick={() => {
                            logout_function();
                        }} className="bg-red-400 px-3 py-2 text-white rounded-md text-center font-semibold uppercase cursor-pointer shadow-sm hover:bg-red-600 transition-colors duration-500">Cerrar Sesión</button>
                    </nav>
                </div>
            </header>
        </>
    );
}