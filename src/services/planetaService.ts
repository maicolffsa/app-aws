import axios from 'axios';

export interface Planeta {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

export const obtenerPlaneta = async (url: string): Promise<Planeta> => {
  try {
    // Indicamos que la respuesta tiene el tipo `Planeta`
    const response = await axios.get<Planeta>(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del planeta', error);
    throw error;
  }
};