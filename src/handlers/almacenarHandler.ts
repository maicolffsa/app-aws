import { APIGatewayEvent, Context } from 'aws-lambda';
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import dynamoDb from "../config/db";
import { authenticateJWT } from "../middlewares/authenticateJWT";

const TABLE_NAME = process.env.TABLE_NAME || "FusionadosCache";

export const storeData = async (event: APIGatewayEvent, context: Context) => {
  try {
    const authResult = await authenticateJWT(event);
    if (authResult) return authResult;

    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ message: "Datos inválidos" }) };
    }

    const item = {
      id: uuidv4(),
      data: JSON.parse(event.body),
      createdAt: new Date().toISOString(),
    };

    await dynamoDb.put({ TableName: TABLE_NAME, Item: item }).promise();

    return { statusCode: 201, body: JSON.stringify({ message: "Datos almacenados", item }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: "Error al almacenar datos", error }) };
  }
};
