import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import dynamoDb from "../config/db";
import { User } from "../models/User";
import { v4 as uuidv4 } from "uuid";

export const register = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { username, password } = JSON.parse(event.body || "{}") as User;

    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Usuario y contraseña requeridos" }),
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await dynamoDb
      .put({
        TableName: process.env.USERS_TABLE || "User"!,
        Item: {id: username, password: hashedPassword },
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Usuario registrado exitosamente" }),
    };
  } catch (error) {
    console.error("Error en register:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};