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
exports.storeData = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const authenticateJWT_1 = require("../middlewares/authenticateJWT"); // Ruta al middleware
const dynamoDB = new aws_sdk_1.default.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "FusionadosCache";
const storeData = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, authenticateJWT_1.authenticateJWT)(event);
        if (!event.body) {
            return { statusCode: 400, body: JSON.stringify({ message: "Datos inválidos" }) };
        }
        const item = {
            id: (0, uuid_1.v4)(),
            data: JSON.parse(event.body),
            createdAt: new Date().toISOString(),
        };
        yield dynamoDB.put({ TableName: TABLE_NAME, Item: item }).promise();
        return { statusCode: 201, body: JSON.stringify({ message: "Datos almacenados", item }) };
    }
    catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: "Error al almacenar datos", error }) };
    }
});
exports.storeData = storeData;
