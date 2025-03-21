import jwt from 'jsonwebtoken';

// Clave secreta para verificar el JWT
const secretKey = 'supersecre34434434343434to'; // Cambia esto a una clave más segura en producción

// Middleware para verificar JWT
export const authenticateJWT = (event: any) => {
  const token = event.headers.Authorization || event.headers.authorization;

  if (!token) {
    throw new Error('Token no proporcionado');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Token no válido');
  }
};

