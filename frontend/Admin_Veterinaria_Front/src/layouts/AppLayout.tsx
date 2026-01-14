import {Outlet} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {userInSessionFunction} from "../services/AuthService.ts";
import {Page403} from "../components/Page403.tsx";
import {HeaderAdmin} from "../components/admin/HeaderAdmin.tsx";
import {FooterAdmin} from "../components/admin/FooterAdmin.tsx";

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
        return <Page403/>
    }
    return (
        <>
            <div className="bg-slate-100">
                <HeaderAdmin/>
                <main className="container mx-auto mt-10">
                    <Outlet/>
                </main>
                <FooterAdmin/>
            </div>
        </>
    );
}