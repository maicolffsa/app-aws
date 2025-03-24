// tests/handlers/almacenar.test.ts
import { storeData as handler } from '../../handlers/almacenarHandler'; // Importamos el handler
import { APIGatewayEvent, Context } from 'aws-lambda';

// Mock de la función saveData (simulando que la base de datos responde)
jest.mock('../../src/utils/db', () => ({
  saveData: jest.fn(),
}));

describe('Test del endpoint almacenar', () => {

  it('debería almacenar datos correctamente', async () => {
    // Mock de la respuesta de saveData
    const mockResponse = { status: 'success' };
    const { saveData } = require('../../src/utils/db');
    saveData.mockResolvedValue(mockResponse); // Simulamos éxito

    // Creamos el evento simulado
    const event: APIGatewayEvent = {
      body: JSON.stringify({ nombre: 'Luke Skywalker', planeta: 'Tatooine', especie: 'Humano' }),
      httpMethod: 'POST',
      headers: {},
      path: '',
      queryStringParameters: {},
      stageVariables: {},
      isBase64Encoded: false,
      requestContext: {} as any,
      resource: '',
    } as any;

    const context: Context = {} as any;

    // Llamamos al handler
    const result = await handler(event, context);

    // Verificamos que el status sea 200 y el mensaje de éxito esté presente
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).message).toBe('Datos almacenados correctamente');
    expect(JSON.parse(result.body).data).toEqual(mockResponse);
  });

  it('debería manejar error en el almacenamiento', async () => {
    // Simulamos un error en saveData
    const { saveData } = require('../../src/utils/db');
    saveData.mockRejectedValue(new Error('Error al guardar los datos'));

    // Creamos el evento simulado
    const event: APIGatewayEvent = {
      body: JSON.stringify({ nombre: 'Leia Organa', planeta: 'Alderaan', especie: 'Humano' }),
      httpMethod: 'POST',
      headers: {},
      path: '',
      queryStringParameters: {},
      stageVariables: {},
      isBase64Encoded: false,
      requestContext: {} as any,
      resource: '',
    } as any;

    const context: Context = {} as any;

    // Llamamos al handler
    const result = await handler(event, context);

    // Verificamos que el status sea 500 y el mensaje de error esté presente
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toBe('Error al guardar los datos');
    expect(JSON.parse(result.body).error).toBe('Error al guardar los datos');
  });
});