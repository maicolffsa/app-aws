"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware para la autenticación JWT
const authenticateJWT = (event) => {
    var _a;
    const authorizationHeader = (_a = event.headers) === null || _a === void 0 ? void 0 : _a.Authorization;
    if (!authorizationHeader) {
        console.error("Token no proporcionado");
        throw new Error('Token no proporcionado');
    }
    const token = authorizationHeader.split(' ')[1]; // Obtener el token de Authorization header
    const secretKey = 'supersecri87y87h8h87786h887877hy887878787h7eto'; // Clave secreta para verificar el token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey); // Verificar el JWT
        console.log("Token válido:", decoded);
    }
    catch (error) {
        console.error("Error al verificar token:", error);
        throw new Error('Token inválido o expirado');
    }
};
exports.authenticateJWT = authenticateJWT;
