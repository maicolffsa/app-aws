"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerClima = void 0;
const axios_1 = __importDefault(require("axios"));
const obtenerClima = (nombrePlaneta) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = process.env.WEATHER_API_KEY || 'c82fdda4ada042b8a79145454252103'; // Usa variables de entorno para la clave de API
    if (!apiKey) {
        throw new Error('API key for WeatherAPI is missing.');
    }
    try {
        const response = yield axios_1.default.get('https://api.weatherapi.com/v1/current.json', {
            params: {
                key: apiKey, // Clave API
                q: nombrePlaneta, // Nombre del planeta o ciudad
                aqi: 'no', // Deshabilitar información de calidad del aire (opcional)
            },
        });
        // Validar si los datos existen antes de acceder
        const { temp_c, humidity, wind_kph } = response.data.current;
        return {
            temperature: temp_c, // Temperatura en Celsius
            humidity, // Humedad
            wind_speed: wind_kph, // Velocidad del viento en km/h
        };
    }
    catch (error) {
        console.error('Error al obtener clima de WeatherAPI', error);
        throw error;
    }
});
exports.obtenerClima = obtenerClima;
