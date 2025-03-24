import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto";

export const authenticateJWT = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult | null> => {
  const token = event.headers.Authorization || event.headers.authorization;

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "No autorizado, token requerido" }),
    };
  }

  try {
    jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    return null;
  } catch (error) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Token inválido" }),
    };
  }
};