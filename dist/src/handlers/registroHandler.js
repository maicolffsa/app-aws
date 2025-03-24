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
exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const register = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = JSON.parse(event.body || "{}");
        if (!username || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Usuario y contraseña requeridos" }),
            };
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield db_1.default
            .put({
            TableName: process.env.USERS_TABLE,
            Item: { username, password: hashedPassword },
        })
            .promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Usuario registrado exitosamente" }),
        };
    }
    catch (error) {
        console.error("Error en register:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error en el registro" }),
        };
    }
});
exports.register = register;
