"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
exports.swaggerConfig = {
    info: {
        title: "Star Wars API",
        description: "API para obtener datos fusionados de Star Wars y datos meteorológicos",
        version: "1.0.0",
    },
    servers: [
        {
            url: "https://{apiId}.execute-api.{region}.amazonaws.com/{stage}",
            description: "Servidor AWS API Gateway",
        },
    ],
    paths: {
        "/fusionados": {
            get: {
                summary: "Obtener datos fusionados de Star Wars y meteorología",
                description: "Este endpoint devuelve los datos combinados de personajes de Star Wars y sus planetas, junto con información meteorológica.",
                responses: {
                    200: {
                        description: "Datos fusionados obtenidos correctamente",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                            example: "Luke Skywalker",
                                        },
                                        weather: {
                                            type: "string",
                                            example: "Soleado",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "No autorizado. El token JWT es inválido o no proporcionado.",
                    },
                    500: {
                        description: "Error interno del servidor",
                    },
                },
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
            },
        },
        "/login": {
            post: {
                summary: "Login y obtener JWT",
                description: "Este endpoint recibe un nombre de usuario y contraseña, y devuelve un token JWT si las credenciales son correctas.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    username: {
                                        type: "string",
                                        example: "usuarioPrueba",
                                    },
                                    password: {
                                        type: "string",
                                        example: "password123",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Login exitoso, se devuelve el token JWT.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        token: {
                                            type: "string",
                                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Usuario no encontrado o credenciales incorrectas.",
                    },
                    500: {
                        description: "Error interno del servidor.",
                    },
                },
            },
        },
        "/history": {
            get: {
                summary: "Obtener historial de datos almacenados",
                description: "Este endpoint permite obtener el historial de los datos que han sido almacenados previamente en la base de datos.",
                responses: {
                    200: {
                        description: "Historial de datos obtenidos correctamente",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                example: "12345",
                                            },
                                            data: {
                                                type: "string",
                                                example: "Datos fusionados",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Error interno del servidor.",
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};
