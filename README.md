# 🚀 StarWars API  

**Autor:** Felix Sullon, Ing. Sistemas  

Esta API combina datos de Star Wars con información de otra API pública, proporcionando una experiencia enriquecida para los usuarios. Se ha desarrollado utilizando **TypeScript**, **AWS Lambda**, **Serverless Framework**, **DynamoDB** y otras tecnologías clave.  

## 🔧 Tecnologías Usadas  
- **Node.js 20** + **TypeScript**  
- **AWS Lambda** (Funciones serverless)  
- **Serverless Framework** (Para despliegue en AWS)  
- **AWS API Gateway** (Para gestionar endpoints)  
- **DynamoDB** (Base de datos NoSQL)  
- **JWT (JSON Web Tokens)** (Autenticación)  
- **Swagger** (Documentación de API)  
- **AWS CloudWatch** (Logs y monitoreo)  
- **AWS X-Ray** (Trazabilidad y performance)  
- **Redis / DynamoDB** (Caché de consultas)  
- **Jest** (Pruebas unitarias e integración)  
- **Gherkin (BDD)** (Pruebas estructuradas)  

## 📌 Endpoints de la API  

### 1️⃣ Registro de Usuario  
- **Endpoint:** `/register`  
- **Función:** `starwars-api-dev-register`  
- **Método:** `POST`  
- **Descripción:** Registra un usuario en el sistema con su `username` y `password`.  

#### 📝 Ejemplo de Request  
```json
{
    "username": "luke",
    "password": "maytheforce"
}
✅ Ejemplo de Response
json
Copiar
Editar
{
    "message": "Usuario registrado con éxito"
}
2️⃣ Inicio de Sesión
Endpoint: /login
Función: starwars-api-dev-login
Método: POST
Descripción: Autentica a un usuario y devuelve un JWT.
📝 Ejemplo de Request
json
Copiar
Editar
{
    "username": "luke",
    "password": "maytheforce"
}
✅ Ejemplo de Response
json
Copiar
Editar
{
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
3️⃣ Obtener Datos Fusionados 🔒
Endpoint: /getFusionados
Función: starwars-api-dev-getFusionados
Método: GET
Descripción: Fusiona datos de SWAPI con otra API externa y los retorna.
Seguridad: Protegido con JWT
4️⃣ Almacenar Datos 🔒
Endpoint: /storeData
Función: starwars-api-dev-storeData
Método: POST
Descripción: Almacena datos personalizados en la base de datos.
Seguridad: Protegido con JWT
5️⃣ Consultar Historial 🔒
Endpoint: /getHistory
Función: starwars-api-dev-getHistory
Método: GET
Descripción: Recupera el historial de datos almacenados por el usuario.
Seguridad: Protegido con JWT
6️⃣ Documentación de la API
Endpoint: /apiDocs
Función: starwars-api-dev-apiDocs
Método: GET
Descripción: Muestra la documentación interactiva generada con Swagger.
🔒 Seguridad en los Endpoints
Los siguientes endpoints requieren un JWT válido en el encabezado Authorization:

/getFusionados
/storeData
/getHistory
Ejemplo de uso del token en el header:

json
Copiar
Editar
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
}
📜 Licencia
Proyecto desarrollado por Felix Sullon, Ing. Sistemas.

Copiar
Editar
