import {FormularioPacientes} from "../../components/admin/FormularioPacientes.tsx";
import {ListadoPacientes} from "../../components/admin/ListadoPacientes.tsx";

export const AdminView = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 lg:w-2/5 mx-3">
                    <FormularioPacientes/>
                </div>
                <div className="w-1/2 lg:w-3/5 mx-3">
                    <ListadoPacientes/>
                </div>
            </div>
        </>
    );
}