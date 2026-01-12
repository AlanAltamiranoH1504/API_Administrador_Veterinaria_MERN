import {Link} from "react-router-dom";

export const FooterNavBarAuth = () => {
    return (
        <>
            <div className="flex flex-row justify-around">
                <Link to="/" className="text-gray-500 text-sm hover:text-indigo-500 transition-colors duration-500">Iniciar Sesion</Link>
                <Link to="/forget-password" className="text-gray-500 text-sm  hover:text-indigo-500 transition-colors duration-500">Olvide mi contraseña</Link>
            </div>
        </>
    )
}