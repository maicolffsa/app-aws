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
// tests/handlers/historial.test.ts
const historial_1 = require("../../../src/handlers/historial");
// Mock de la base de datos
jest.mock('../../src/utils/db', () => ({
    obtenerHistorial: jest.fn(),
}));
describe('Test endpoint obtener historial', () => {
    it('debería obtener el historial de datos correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock de los datos históricos
        const mockHistorial = [
            { nombre: 'Luke Skywalker', planeta: 'Tatooine', especie: 'Humano', clima: 'Sunny', temperature: 25 },
            { nombre: 'Leia Organa', planeta: 'Alderaan', especie: 'Humano', clima: 'Rainy', temperature: 18 },
        ];
        require('../../src/utils/db').obtenerHistorial.mockResolvedValue(mockHistorial);
        const event = {
            body: '',
            httpMethod: 'GET',
            headers: {},
            path: '',
            queryStringParameters: {},
            stageVariables: {},
            isBase64Encoded: false,
            requestContext: {},
            resource: '',
        };
        const context = {};
        const result = yield (0, historial_1.getHistory)(event, context);
        expect(result.statusCode).toBe(200);
        expect(result.body).toContain('Historial de datos obtenido correctamente');
        expect(result.body).toContain('Luke Skywalker');
        expect(result.body).toContain('Tatooine');
        expect(result.body).toContain('Sunny');
    }));
    it('debería manejar error al obtener el historial de datos', () => __awaiter(void 0, void 0, void 0, function* () {
        require('../../src/utils/db').obtenerHistorial.mockRejectedValue(new Error('Error al obtener historial'));
        const event = {
            body: '',
            httpMethod: 'GET',
            headers: {},
            path: '',
            queryStringParameters: {},
            stageVariables: {},
            isBase64Encoded: false,
            requestContext: {},
            resource: '',
        };
        const context = {};
        const result = yield (0, historial_1.getHistory)(event, context);
        expect(result.statusCode).toBe(500);
        expect(result.body).toContain('Error al obtener el historial de datos');
    }));
});
