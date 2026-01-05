export const RegisterAdmin = () => {
    return (
        <>
            <div className="md:flex md:items-center md:justify-center min-h-screen px-4 gap-8">
                <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                    <img src="/imgs/Logtipo_2.png" alt={"Logotipo"} />
                </div>

                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm border w-full max-w-xl">
                    <div className="flex items-center justify-center">
                        <img src="/imgs/Cara_perro.png" className="max-h-32" alt="Cara de perro"/>
                    </div>

                    <div className="mb-5">
                        <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Nombre:</label>
                        <input type={"text"} className="border p-3 w-full rounded-lg" placeholder="Nombre de veterinario"/>
                    </div>

                    <div className={"mb-5"}>
                        <label className={"mb-2 block uppercase text-gray-600 font-bold"}>Apellidos:</label>
                        <input type="text" className="border p-3 w-full rounded-lg" placeholder="Apellidos del veterinario"/>
                    </div>

                    <div className="mb-5">
                        <label className="mb-2 block uppercase text-gray-600 font-bold">Email de Registro:</label>
                        <input type={"email"} className="border p-3 w-full rounded-lg" placeholder="Email de registro valido"/>
                    </div>

                    <div className="mb-5">
                        <label className="mb-2 block uppercase text-gray-600 font-bold">Telefono de Veterinario</label>
                        <input type={"text"} className={"border p-3 w-full rounded-lg"} placeholder="Telefono de Contacto"/>
                    </div>

                    <div className="mb-5">
                        <label className="mb-2 block uppercase text-gray-600 font-bold">Edad:</label>
                        <input type={"text"} className={"border p-3 w-full rounded-lg"} placeholder="Telefono de Contacto"/>
                    </div>

                    <div className="mb-5">
                        <label className="mb-2 block uppercase text-gray-600 font-bold">Password:</label>
                        <input type={"password"} className={"border p-3 w-full rounded-lg"} placeholder="Minimo 5 caracteres"/>
                    </div>

                    <div className="mb-5">
                        <input type={"submit"} value="Registrarse" className="w-full px-3 py-2 border rounded-lg bg-indigo-600 text-lg text-white font-semibold cursor-pointer hover:bg-indigo-700 transition-colors duration-500"/>
                    </div>
                </div>
            </div>
        </>
    );
}