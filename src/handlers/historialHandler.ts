
import { APIGatewayEvent, Context } from 'aws-lambda';
import AWS from "aws-sdk";
import { authenticateJWT } from "../middlewares/authenticateJWT";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "FusionadosCache";

export const getHistory = async (event: APIGatewayEvent, context: Context) => {
  try {
    const authResult = await authenticateJWT(event);
    if (authResult) return authResult;

    const result = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();
    return { statusCode: 200, body: JSON.stringify(result.Items) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: "Error al obtener historial", error }) };
  }
};