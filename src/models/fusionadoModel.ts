export interface Fusionado {
    personaje: string;
    planeta: string;
    clima: {
      temperature: number;
      humidity: number;
      wind_speed: number;
    };
    poblacion: string;
    terreno: string;
    clima_planeta: string;
  }