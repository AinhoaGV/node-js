import { isValidToken } from "../services/jwt.services.js";

const authMiddleware = (req, res, next) => {
    const authoritation = req.headers.authorization;
    // Comprobar si el token viene en el header
    if(!authoritation?.startsWith("Bearer ")){
        return res.status(401).json({
            success: false,
            message: "Token requerido",
        })
    }

    const token = authoritation.replace("Bearer ", "").trim();
    const payload = isValidToken(token);
    console.log({payload, token});
    //SI el token es valido lo dejamos pasar.
    if(payload){
        req.user = payload; //Guardamos el payload en el request
        return next();
    }
    return res.status(401).json({
        success: false,
        message: "El token es invalido o ha expirado",
    })
}

export default authMiddleware;