import { obtenerPersonajes } from '../services/swapiService';
import { obtenerClima } from '../services/weatherService';
import { obtenerPlaneta } from '../services/planetaService';
import { Fusionado } from '../models/fusionadoModel';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { authenticateJWT } from '../middlewares/authenticateJWT'; // Ruta al middleware



export const getFusionados =  async (event: APIGatewayEvent, context: Context) => {
  try {

   // authenticateJWT(event);

    const planetasDelSistemaSolar = [
      { nombre: "Mercurio", tipo: "Rocoso", radio: 2439.7, distanciaSol: 57.91 },
      { nombre: "Venus", tipo: "Rocoso", radio: 6051.8, distanciaSol: 108.2 },
      { nombre: "Tierra", tipo: "Rocoso", radio: 6371, distanciaSol: 149.6 },
      { nombre: "Marte", tipo: "Rocoso", radio: 3389.5, distanciaSol: 227.9 },
      { nombre: "Jupiter", tipo: "Gaseoso", radio: 69911, distanciaSol: 778.5 },
      { nombre: "Saturno", tipo: "Gaseoso", radio: 58232, distanciaSol: 1433.5 },
      { nombre: "Urano", tipo: "Gaseoso", radio: 25362, distanciaSol: 2872.5 },
      { nombre: "Neptuno", tipo: "Gaseoso", radio: 24622, distanciaSol: 4495.1 }
    ];

    function obtenerPlanetaAleatorio(): string {
      const indiceAleatorio = Math.floor(Math.random() * planetasDelSistemaSolar.length);
      return planetasDelSistemaSolar[indiceAleatorio].nombre;
    }
    
    const planetaAleatorio = obtenerPlanetaAleatorio();
    //console.log(`Planeta aleatorio: ${planetaAleatorio}`);

    // Obtener los personajes de SWAPI
    const personajes = await obtenerPersonajes();
    const datosFusionados: Fusionado[] = [];

    // Iterar sobre cada personaje para obtener sus datos y combinar
    for (const personaje of personajes) {
      const planeta = await obtenerPlaneta(personaje.homeworld);
      const clima = await obtenerClima(planetaAleatorio);  // Obtener el clima del planeta

      // Crear el objeto fusionado
      const fusionado: Fusionado = {
        personaje: personaje.name,
        planeta: planeta.name,
        clima: clima,
        poblacion: planeta.population,
        terreno: planeta.terrain,
        clima_planeta: planeta.climate,
      };

      datosFusionados.push(fusionado);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(datosFusionados),
    };
  } catch (error) {
    console.error('Error al obtener datos fusionados', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al obtener datos fusionados',
        error: error,
      }),
    };
  }
};