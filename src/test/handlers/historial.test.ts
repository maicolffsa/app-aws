// tests/handlers/historial.test.ts
import { getHistory as handler } from '../../handlers/historialHandler';
import { APIGatewayEvent, Context } from 'aws-lambda';

// Mock de la base de datos
jest.mock('../../src/config/db', () => ({
  obtenerHistorial: jest.fn(),
}));

describe('Test endpoint obtener historial', () => {
  it('debería obtener el historial de datos correctamente', async () => {
    // Mock de los datos históricos
    const mockHistorial = [
      { nombre: 'Luke Skywalker', planeta: 'Tatooine', especie: 'Humano', clima: 'Sunny', temperature: 25 },
      { nombre: 'Leia Organa', planeta: 'Alderaan', especie: 'Humano', clima: 'Rainy', temperature: 18 },
    ];

    (require('../../src/utils/db').obtenerHistorial as jest.Mock).mockResolvedValue(mockHistorial);

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
    expect(result.body).toContain('Historial de datos obtenido correctamente');
    expect(result.body).toContain('Luke Skywalker');
    expect(result.body).toContain('Tatooine');
    expect(result.body).toContain('Sunny');
  });

  it('debería manejar error al obtener el historial de datos', async () => {
    (require('../../src/utils/db').obtenerHistorial as jest.Mock).mockRejectedValue(new Error('Error al obtener historial'));

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
    expect(result.body).toContain('Error al obtener el historial de datos');
  });
});