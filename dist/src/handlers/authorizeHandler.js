"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeHandler = void 0;
// src/handlers/authorizeHandler.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizeHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = event.headers.Authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Obtener el token de Authorization header
    // Verifica si la variable de entorno JWT_SECRET_KEY está definida
    const secretKey = "supersecre34434434343434to";
    if (!secretKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Clave secreta no configurada en las variables de entorno.' }),
        };
    }
    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Token no proporcionado' }),
        };
    }
    try {
        // Verificar el JWT y asegurarse de que el tipo de "decoded" sea JwtPayload
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Asegurarse de que decoded tiene la propiedad sub
        if (!decoded.sub) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Token inválido: sub no encontrado' }),
            };
        }
        // Crear una política de acceso que permita el acceso a la API
        return generateAllowPolicy(decoded.sub, event.methodArn); // Llamada a la función correctamente
    }
    catch (error) {
        console.error('Error al verificar el token', error);
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Token inválido o expirado' }),
        };
    }
});
exports.authorizeHandler = authorizeHandler;
// Función para generar una política de "allow" para API Gateway
const generateAllowPolicy = (principalId, resource) => {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: resource,
                },
            ],
        },
    };
};
