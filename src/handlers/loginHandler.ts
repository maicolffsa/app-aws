import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import dynamoDb from "../config/db";
import { generateToken } from "../utils/jwt";
import { User } from "../models/User";

export const login = async (
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

    const result = await dynamoDb
      .get({
        TableName: process.env.USERS_TABLE! || "User",
        Key: { id: username },
      })
      .promise();

    const user = result.Item as User;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Credenciales inválidas" }),
      };
    }

    const token = generateToken(username);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login exitoso", token }),
    };
  } catch (error) {
    console.error("Error en login:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};