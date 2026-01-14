import {Link} from "react-router-dom";

export const Page403 = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center min-h-screen p-4">
                <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md text-center border border-gray-200">
                    <div className="text-red-500">
                        {/*<svg className="mx-auto h-20 w-20" fill="none" stroke="currentColor" stroke-width="1.5"*/}
                        {/*     viewBox="0 0 24 24">*/}
                        {/*    <path stroke-linecap="round" stroke-linejoin="round"*/}
                        {/*          d="M12 9v2.25M12 15h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"/>*/}
                        {/*</svg>*/}
                    </div>
                    <img src="/imgs/Perro_Triste.png" alt="Imagen Triste" className="max-h-32 mx-auto"/>
                    <h1 className="text-5xl font-extrabold text-gray-800 mt-4 mb-2">403</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Acceso Denegado</h2>
                    <p className="text-gray-500 mb-6">No tienes permiso para acceder a esta sección.</p>
                    <Link to="/" className="bg-indigo-500 px-3 py-2 rounded-lg text-white font-semibold hover:bg-indigo-700 transition-colors duration-500">Iniciar Sesión</Link>
                </div>
            </div>
        </>
    );
}