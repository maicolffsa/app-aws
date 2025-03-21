// src/handlers/authorizeHandler.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authorizeHandler = async (event: any) => {
  const token = event.headers.Authorization?.split(' ')[1]; // Obtener el token de Authorization header
  
  // Verifica si la variable de entorno JWT_SECRET_KEY está definida
  const secretKey = process.env.JWT_SECRET;
  
  if (!secretKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Clave secreta no configurada en las variables de entorno.' }),
    };
  }

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Token no proporcionado' }),
    };
  }

  try {
    // Verificar el JWT y asegurarse de que el tipo de "decoded" sea JwtPayload
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // Asegurarse de que decoded tiene la propiedad sub
    if (!decoded.sub) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Token inválido: sub no encontrado' }),
      };
    }

    // Crear una política de acceso que permita el acceso a la API
    return generateAllowPolicy(decoded.sub, event.methodArn); // Llamada a la función correctamente
  } catch (error) {
    console.error('Error al verificar el token', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Token inválido o expirado' }),
    };
  }
};

// Función para generar una política de "allow" para API Gateway
const generateAllowPolicy = (principalId: string, resource: string) => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: resource,
        },
      ],
    },
  };
};