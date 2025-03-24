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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const jwt_1 = require("../utils/jwt");
const login = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = JSON.parse(event.body || "{}");
        if (!username || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Usuario y contraseña requeridos" }),
            };
        }
        const result = yield db_1.default
            .get({
            TableName: process.env.USERS_TABLE || "User",
            Key: { id: username },
        })
            .promise();
        const user = result.Item;
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Credenciales inválidas" }),
            };
        }
        const token = (0, jwt_1.generateToken)(username);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login exitoso", token }),
        };
    }
    catch (error) {
        console.error("Error en login:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error }),
        };
    }
});
exports.login = login;
