import axios from 'axios';

export interface Personaje {
  name: string;
  homeworld: string;
}

export interface ResponsePersonajes {
  results: Personaje[];
}

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    // Especificamos el tipo de la respuesta
    const response = await axios.get<ResponsePersonajes>('https://swapi.dev/api/people/');
    return response.data.results;
  } catch (error) {
    console.error('Error al obtener personajes de SWAPI', error);
    throw error;
  }
};