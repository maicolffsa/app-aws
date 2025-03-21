"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Clave secreta para verificar el JWT
const secretKey = 'supersecre34434434343434to'; // Cambia esto a una clave más segura en producción
// Middleware para verificar JWT
const authenticateJWT = (event) => {
    const token = event.headers.Authorization || event.headers.authorization;
    if (!token) {
        throw new Error('Token no proporcionado');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        throw new Error('Token no válido');
    }
};
exports.authenticateJWT = authenticateJWT;
