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
// tests/handlers/fusionar.test.ts
const fusionadosHandler_1 = require("../../handlers/fusionadosHandler");
// Mock de las funciones de las APIs
jest.mock('../../src/services/swapi', () => ({
    obtenerPersonajes: jest.fn(),
}));
jest.mock('../../src/services/weatherApi', () => ({
    obtenerClima: jest.fn(),
}));
describe('Test endpoint fusionar', () => {
    it('debería fusionar los datos correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock de los datos de personajes y clima
        const mockPersonajes = [
            { name: 'Luke Skywalker', homeworld: 'Tatooine' },
            { name: 'Leia Organa', homeworld: 'Alderaan' },
        ];
        const mockClima = { current: { temperature: 25, condition: 'Sunny' } };
        require('../../src/services/swapi').obtenerPersonajes.mockResolvedValue(mockPersonajes);
        require('../../src/services/weatherApi').obtenerClima.mockResolvedValue(mockClima);
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
        const result = yield (0, fusionadosHandler_1.getFusionados)(event, context);
        expect(result.statusCode).toBe(200);
        expect(result.body).toContain('Datos fusionados correctamente');
        expect(result.body).toContain('Luke Skywalker');
        expect(result.body).toContain('Tatooine');
        expect(result.body).toContain('Sunny');
    }));
    it('debería manejar error al fusionar los datos', () => __awaiter(void 0, void 0, void 0, function* () {
        require('../../src/services/swapi').obtenerPersonajes.mockRejectedValue(new Error('Error al obtener personajes'));
        require('../../src/services/weatherApi').obtenerClima.mockRejectedValue(new Error('Error al obtener clima'));
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
        const result = yield (0, fusionadosHandler_1.getFusionados)(event, context);
        expect(result.statusCode).toBe(500);
        expect(result.body).toContain('Error al fusionar los datos');
    }));
});
