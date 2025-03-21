// src/middlewares/authenticateJWT.ts
import { APIGatewayEvent } from 'aws-lambda';
import jwt from 'jsonwebtoken';

// Middleware para la autenticación JWT
export const authenticateJWT = (event: APIGatewayEvent): void => {
  const authorizationHeader = event.headers?.Authorization;
  
  if (!authorizationHeader) {
    console.error("Token no proporcionado");
    throw new Error('Token no proporcionado');
  }

  const token = authorizationHeader.split(' ')[1]; // Obtener el token de Authorization header
  const secretKey = 'supersecri87y87h8h87786h887877hy887878787h7eto'; // Clave secreta para verificar el token

  try {
    const decoded = jwt.verify(token, secretKey); // Verificar el JWT
    console.log("Token válido:", decoded);
  } catch (error) {
    console.error("Error al verificar token:", error);
    throw new Error('Token inválido o expirado');
  }
};