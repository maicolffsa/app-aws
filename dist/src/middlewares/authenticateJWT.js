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
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secreto";
const authenticateJWT = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const token = event.headers.Authorization || event.headers.authorization;
    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: "No autorizado, token requerido" }),
        };
    }
    try {
        jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), JWT_SECRET);
        return null;
    }
    catch (error) {
        return {
            statusCode: 403,
            body: JSON.stringify({ message: "Token inválido" }),
        };
    }
});
exports.authenticateJWT = authenticateJWT;
