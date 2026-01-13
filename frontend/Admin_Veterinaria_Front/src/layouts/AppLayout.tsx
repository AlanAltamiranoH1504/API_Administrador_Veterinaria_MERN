import {Outlet} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {userInSessionFunction} from "../services/AuthService.ts";

export const AppLayout = () => {
    const {isLoading, isError} = useQuery({
        queryKey: ["userInSession"],
        queryFn: userInSessionFunction,
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading){
        return <div className="max-w-5xl mx-auto  text-orange-600 text-4xl text-center font-bold">Cargando...</div>
    }

    if (isError){
        return <div className="max-w-5xl mx-auto  text-orange-600 text-4xl text-center font-bold">ERROR...</div>
    }
    return (
        <>
            <div className="bg-slate-100">
                <Outlet/>
            </div>
        </>
    );
}