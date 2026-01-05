import {Outlet} from "react-router-dom";
import {HeaderPublic} from "../components/HeaderPublic.tsx";

export const AuthLayout = () => {
    return (
        <>
            <div className="bg-slate-100 ">
                <HeaderPublic/>
                {/*<div className="max-w-xl mx-auto px-5">*/}
                    {/*<img alt={"Imagen de logo"} src="/imgs/Icon_AV.png"/>*/}
                    <Outlet/>
                {/*</div>*/}
            </div>
        </>
    );
}