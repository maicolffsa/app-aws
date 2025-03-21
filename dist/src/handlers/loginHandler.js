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
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Simulando una base de datos de usuarios
const usuarios = [
    { id: 1, username: 'luke', password: 'luke123' }, // Contraseña: "luke123"
];
// Definir la clave secreta para firmar el JWT
const secretKey = 'supersecre34434434343434to'; // Cambia esto a una clave más segura en producción
// Función para manejar el login
const login = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = JSON.parse(event.body);
    console.log("user: ", username);
    const usuario = usuarios.find(u => u.username === username);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    // Validar la contraseña
    const passwordMatch = usuarios.find(u => u.password === password);
    if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
    }
    // Crear un token JWT
    const token = jsonwebtoken_1.default.sign({ id: usuario.id, username: usuario.username }, secretKey, { expiresIn: '1h' });
    return token;
});
exports.login = login;
