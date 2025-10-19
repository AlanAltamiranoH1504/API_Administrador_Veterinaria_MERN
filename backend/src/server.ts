import express from "express";
import {conexion_db_mongo} from "./config/DbConnection";
import pacientesRouter from "./routers/PacientesRouter";
import veterinarioRouter from "./routers/VeterinarioRouter";
import authRouter from "./routers/AuthRouter";

const app = express();

app.use(express.json());
conexion_db_mongo().then(() => {
    console.log("CONEXIÓN CORRECTA A BASE DE DATOS");
}).catch((error) => {
    console.log(`Error en la conexion a la db ${error.message}`);
});

app.use("/pacientes", pacientesRouter);
app.use("/veterinarios", veterinarioRouter);
app.use("/auth", authRouter);


export default app;