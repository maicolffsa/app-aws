// tests/handlers/fusionar.test.ts
import { getFusionados as handler } from '../../../src/handlers/fusionados';
import { APIGatewayEvent, Context } from 'aws-lambda';

// Mock de las funciones de las APIs
jest.mock('../../src/services/swapi', () => ({
  obtenerPersonajes: jest.fn(),
}));

jest.mock('../../src/services/weatherApi', () => ({
  obtenerClima: jest.fn(),
}));

describe('Test endpoint fusionar', () => {
  it('debería fusionar los datos correctamente', async () => {
    // Mock de los datos de personajes y clima
    const mockPersonajes = [
      { name: 'Luke Skywalker', homeworld: 'Tatooine' },
      { name: 'Leia Organa', homeworld: 'Alderaan' },
    ];

    const mockClima = { current: { temperature: 25, condition: 'Sunny' } };

    (require('../../src/services/swapi').obtenerPersonajes as jest.Mock).mockResolvedValue(mockPersonajes);
    (require('../../src/services/weatherApi').obtenerClima as jest.Mock).mockResolvedValue(mockClima);

    const event: APIGatewayEvent = {
      body: '',
      httpMethod: 'GET',
      headers: {},
      path: '',
      queryStringParameters: {},
      stageVariables: {},
      isBase64Encoded: false,
      requestContext: {} as any,
      resource: '',
    } as any;

    const context: Context = {} as any;

    const result = await handler(event, context);

    expect(result.statusCode).toBe(200);
    expect(result.body).toContain('Datos fusionados correctamente');
    expect(result.body).toContain('Luke Skywalker');
    expect(result.body).toContain('Tatooine');
    expect(result.body).toContain('Sunny');
  });

  it('debería manejar error al fusionar los datos', async () => {
    (require('../../src/services/swapi').obtenerPersonajes as jest.Mock).mockRejectedValue(new Error('Error al obtener personajes'));
    (require('../../src/services/weatherApi').obtenerClima as jest.Mock).mockRejectedValue(new Error('Error al obtener clima'));

    const event: APIGatewayEvent = {
      body: '',
      httpMethod: 'GET',
      headers: {},
      path: '',
      queryStringParameters: {},
      stageVariables: {},
      isBase64Encoded: false,
      requestContext: {} as any,
      resource: '',
    } as any;

    const context: Context = {} as any;

    const result = await handler(event, context);

    expect(result.statusCode).toBe(500);
    expect(result.body).toContain('Error al fusionar los datos');
  });
});