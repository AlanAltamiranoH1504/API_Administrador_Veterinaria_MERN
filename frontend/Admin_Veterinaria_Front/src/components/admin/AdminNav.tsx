import {Link} from "react-router-dom";

export const AdminNav = () => {
    return (
        <>
            <nav className="flex flex-col md:flex-row gap-6">
                <Link to={"/perfil"} className="font-bold uppercase text-gray-500 ">Perfil</Link>
                <Link to={"/change_password"} className="font-bold uppercase text-gray-500">Actualizar password</Link>
            </nav>
        </>
    );
}