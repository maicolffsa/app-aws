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
exports.login = exports.register = void 0;
// src/services/auth.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Simulamos una base de datos en memoria para usuarios
const usuarios = [
    { id: 1, username: 'luke', password: '$2a$10$L2nLq.rHuaFc.Uz8Gm5OCdbAGbfbOrlIuDiyfMQePb5Bcc1I7qAS2' }, // Contraseña: "luke123"
];
// Clave secreta para firmar el JWT
const secretKey = 'supersecreto'; // En producción, usa una clave más segura
// Función para registrar usuarios
const register = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioExistente = usuarios.find(u => u.username === username);
    if (usuarioExistente) {
        throw new Error('El usuario ya existe');
    }
    // Cifrar la contraseña antes de guardarla
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Crear un nuevo usuario
    const nuevoUsuario = { id: usuarios.length + 1, username, password: hashedPassword };
    usuarios.push(nuevoUsuario);
    return { message: 'Usuario registrado con éxito' };
});
exports.register = register;
// Función para loguear usuarios
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = usuarios.find(u => u.username === username);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const passwordMatch = yield bcryptjs_1.default.compare(password, usuario.password);
    if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
    }
    // Crear un token JWT
    const token = jsonwebtoken_1.default.sign({ id: usuario.id, username: usuario.username }, secretKey, { expiresIn: '1h' });
    return { token };
});
exports.login = login;
