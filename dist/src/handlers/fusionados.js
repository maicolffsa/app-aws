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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFusionados = void 0;
const swapiService_1 = require("../services/swapiService");
const weatherService_1 = require("../services/weatherService");
const planetaService_1 = require("../services/planetaService");
const getFusionados = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
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
        function obtenerPlanetaAleatorio() {
            const indiceAleatorio = Math.floor(Math.random() * planetasDelSistemaSolar.length);
            return planetasDelSistemaSolar[indiceAleatorio].nombre;
        }
        const planetaAleatorio = obtenerPlanetaAleatorio();
        //console.log(`Planeta aleatorio: ${planetaAleatorio}`);
        // Obtener los personajes de SWAPI
        const personajes = yield (0, swapiService_1.obtenerPersonajes)();
        const datosFusionados = [];
        // Iterar sobre cada personaje para obtener sus datos y combinar
        for (const personaje of personajes) {
            const planeta = yield (0, planetaService_1.obtenerPlaneta)(personaje.homeworld);
            const clima = yield (0, weatherService_1.obtenerClima)(planetaAleatorio); // Obtener el clima del planeta
            // Crear el objeto fusionado
            const fusionado = {
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
    }
    catch (error) {
        console.error('Error al obtener datos fusionados', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error al obtener datos fusionados',
                error: error,
            }),
        };
    }
});
exports.getFusionados = getFusionados;
