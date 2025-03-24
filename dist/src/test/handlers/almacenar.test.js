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
Object.defineProperty(exports, "__esModule", { value: true });
// tests/handlers/almacenar.test.ts
const almacenarHandler_1 = require("../../handlers/almacenarHandler"); // Importamos el handler
// Mock de la función saveData (simulando que la base de datos responde)
jest.mock('../../src/utils/db', () => ({
    saveData: jest.fn(),
}));
describe('Test del endpoint almacenar', () => {
    it('debería almacenar datos correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock de la respuesta de saveData
        const mockResponse = { status: 'success' };
        const { saveData } = require('../../src/utils/db');
        saveData.mockResolvedValue(mockResponse); // Simulamos éxito
        // Creamos el evento simulado
        const event = {
            body: JSON.stringify({ nombre: 'Luke Skywalker', planeta: 'Tatooine', especie: 'Humano' }),
            httpMethod: 'POST',
            headers: {},
            path: '',
            queryStringParameters: {},
            stageVariables: {},
            isBase64Encoded: false,
            requestContext: {},
            resource: '',
        };
        const context = {};
        // Llamamos al handler
        const result = yield (0, almacenarHandler_1.storeData)(event, context);
        // Verificamos que el status sea 200 y el mensaje de éxito esté presente
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe('Datos almacenados correctamente');
        expect(JSON.parse(result.body).data).toEqual(mockResponse);
    }));
    it('debería manejar error en el almacenamiento', () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulamos un error en saveData
        const { saveData } = require('../../src/utils/db');
        saveData.mockRejectedValue(new Error('Error al guardar los datos'));
        // Creamos el evento simulado
        const event = {
            body: JSON.stringify({ nombre: 'Leia Organa', planeta: 'Alderaan', especie: 'Humano' }),
            httpMethod: 'POST',
            headers: {},
            path: '',
            queryStringParameters: {},
            stageVariables: {},
            isBase64Encoded: false,
            requestContext: {},
            resource: '',
        };
        const context = {};
        // Llamamos al handler
        const result = yield (0, almacenarHandler_1.storeData)(event, context);
        // Verificamos que el status sea 500 y el mensaje de error esté presente
        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.body).message).toBe('Error al guardar los datos');
        expect(JSON.parse(result.body).error).toBe('Error al guardar los datos');
    }));
});
