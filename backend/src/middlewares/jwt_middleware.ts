import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {Veterinario} from "../models/Veterinario";

export const jwt_middleware = async (req, res, next) => {
    const header_autorization = req.headers.authorization;

    // * Valdiacion de que viene el header de authorization
    if (!header_autorization) {
        return res.status(401).json({
            status: false,
            message: "JWT No Encontrado en Cabeceras"
        });
    }
    try {
        const jwt_without_bearer = header_autorization.split(" ")[1];
        const verify_token_jwt = jwt.verify(jwt_without_bearer, process.env.JWT_SECRET);

        if (!verify_token_jwt) {
            return res.status(401).json({
                status: false,
                message: "JWT NO VALIDO"
            });
        }

        if (typeof verify_token_jwt === "string") {
            return res.status(401).json({
                status: false,
                message: "JWT Corrupto"
            });
        }

        // * Validacion de contenido de jwt
        const {_id, nombre, email} = verify_token_jwt;
        if (!_id || !nombre || !email) {
            return res.status(401).json({
                status: false,
                message: "CUERPO DE JWT CORRUPTO"
            });
        }

        // * Busqueda de usuario en db y seteo en request
        const user_in_session = await Veterinario.findOne({
            _id,
            email,
            confirmado: true
        });

        if (!user_in_session) {
            return res.status(401).json({
                status: false,
                message: "ERROR EN VALIDACION DE JWT"
            });
        }
        req.user = user_in_session;
        next();
    } catch (e) {
        return res.status(401).json({
            status: false,
            message: "Error en proceso de autenticacion de usuario"
        });
    }
}