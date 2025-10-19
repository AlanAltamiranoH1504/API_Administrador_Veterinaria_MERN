import jwt from "jsonwebtoken";
import type {generate_jwt} from "../types";

export const generate_jwt_function = (data: generate_jwt) => {
    return jwt.sign({
        _id: data._id,
        nombre: data.nombre,
        email: data.email
    }, process.env.JWT_SECRET, {
        expiresIn: "60m"
    });
}