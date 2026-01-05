import {Link} from "react-router-dom";

export const HeaderPublic = () => {
    return (
        <>
            <header className="bg-slate-100 shadow-sm border-b">
                <div className="container mx-auto px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <Link to="/" className="text-4xl font-black text-slate-800"> Veterinaria AV</Link>
                        <p className="text-xl text-indigo-700 font-semibold">Cuidamos su salud, protegemos su felicidad</p>
                    </div>

                    <nav className="flex gap-4 items-center">
                        <Link to="/forget-password" className="font-semibold hover:text-slate-800 transition-colors duration-500 text-gray-600 text-md">Olvide Contraseña</Link>
                        <Link to="/register" className="font-semibold hover:text-slate-100 transition-colors duration-500 text-white px-4 py-2 bg-slate-800 rounded-md text-md">Crear Cuenta</Link>
                    </nav>
                </div>
            </header>
        </>
    );
}