import server from "./server";
import * as dotenv from "dotenv";
dotenv.config();

server.listen(process.env.BACKEND_PORT || 4000, () => {
    console.log(`API BACKEND FUNCIONANDO EN PUERTO: ${process.env.BACKEND_PORT}`);
});