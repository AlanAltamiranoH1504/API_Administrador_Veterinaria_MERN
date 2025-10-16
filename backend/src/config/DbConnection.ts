import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export const conexion_db_mongo = async () => {
    try {
        await mongoose.connect(process.env.URI_DB_MONGO);
    } catch (e) {
        console.log(`Error en conexion a base de datos mongo: ${e.message}`);
    }
}
