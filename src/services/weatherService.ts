import axios from 'axios';

interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
}

// Definir tipos para la respuesta de la API
interface WeatherAPIResponse {
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
  };
}

export const obtenerClima = async (nombrePlaneta: string): Promise<WeatherData> => {
  const apiKey = process.env.WEATHER_API_KEY || 'c82fdda4ada042b8a79145454252103';  // Usa variables de entorno para la clave de API
  
  if (!apiKey) {
    throw new Error('API key for WeatherAPI is missing.');
  }

  try {
    const response = await axios.get<WeatherAPIResponse>('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: apiKey,  // Clave API
        q: nombrePlaneta,  // Nombre del planeta o ciudad
        aqi: 'no',  // Deshabilitar información de calidad del aire (opcional)
      },
    });

    // Validar si los datos existen antes de acceder
    const { temp_c, humidity, wind_kph } = response.data.current;

    return {
      temperature: temp_c,  // Temperatura en Celsius
      humidity,  // Humedad
      wind_speed: wind_kph,  // Velocidad del viento en km/h
    };
  } catch (error) {
    console.error('Error al obtener clima de WeatherAPI', error);
    throw error;
  }
};