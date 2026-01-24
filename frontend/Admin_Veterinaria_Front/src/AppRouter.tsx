import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthLayout} from "./layouts/AuthLayout.tsx";
import {LoginAdmin} from "./views/auth/LoginAdmin.tsx";
import {RegisterAdmin} from "./views/auth/RegisterAdmin.tsx";
import {ConfirmAccount} from "./views/auth/ConfirmAccount.tsx";
import {ForgetPassword} from "./views/auth/ForgetPassword.tsx";
import {SaveNewPasswordView} from "./views/auth/SaveNewPasswordView.tsx";
import {AppLayout} from "./layouts/AppLayout.tsx";
import {AdminView} from "./views/admin/AdminView.tsx";
import {EditProfile} from "./views/admin/EditProfile.tsx";
import {ChangePassword} from "./views/admin/ChangePassword.tsx";

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path="/" element={<LoginAdmin/>}></Route>
                        <Route path="/register" element={<RegisterAdmin/>}></Route>
                        <Route path="/auth/confirmar/:id" element={<ConfirmAccount/>}></Route>
                        <Route path="/forget-password" element={<ForgetPassword/>}></Route>
                        <Route path="/auth/olvide-password/:id" element={<SaveNewPasswordView/>}></Route>
                    </Route>

                    {/* Area privada por jwt*/}
                    <Route element={<AppLayout/>}>
                        <Route path="/admin" element={<AdminView/>}></Route>
                        <Route path="/perfil" element={<EditProfile/>}></Route>
                        <Route path="/change_password" element={<ChangePassword/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}