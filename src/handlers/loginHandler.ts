import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Simulando una base de datos de usuarios
const usuarios = [
  { id: 1, username: 'luke', password: 'luke123' }, // Contraseña: "luke123"
];

// Definir la clave secreta para firmar el JWT
const secretKey = 'supersecre34434434343434to'; // Cambia esto a una clave más segura en producción

// Función para manejar el login
export const login = async (event: { body: string; }) => {

  const { username, password } = JSON.parse(event.body);
  console.log("user: ",username)
  const usuario = usuarios.find(u => u.username === username);

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  // Validar la contraseña
  const passwordMatch = usuarios.find(u => u.password=== password);


  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }

  // Crear un token JWT
  const token = jwt.sign({ id: usuario.id, username: usuario.username }, secretKey, { expiresIn: '1h' });

  return token;
};