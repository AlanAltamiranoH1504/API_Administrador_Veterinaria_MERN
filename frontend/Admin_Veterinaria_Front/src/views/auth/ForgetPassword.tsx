export const ForgetPassword = () => {
    return (
        <>
            <div className="md:flex md:items-center md:justify-center min-h-screen px-4 gap-8">
                <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                    <img src="/imgs/Icon_AV.png"  alt="Logotipo"/>
                </div>

                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm border w-full max-w-xl">
                    <div className="flex items-center justify-center">
                        <img src="/imgs/Icono_Sencillo.png" alt="Icono Huella Perro" className="max-h-32"/>
                    </div>
                    <h2 className="text-center text-4xl font-bold mb-10">¿Olvidaste tu contraseña? Recuperala con tu email</h2>

                    <div className="mb-5">
                        <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Email de Registro:</label>
                        <input type={"email"} className="border p-3 w-full rounded-lg" placeholder="Ej: correo@gmail.com"/>
                    </div>

                    <div className="mb-5">
                        <input type="submit" value={"Enviar Instrucciones"} className="w-full px-3 py-2 rounded-lg border font-semibold bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-500"/>
                    </div>
                </div>
            </div>
        </>
    )
}