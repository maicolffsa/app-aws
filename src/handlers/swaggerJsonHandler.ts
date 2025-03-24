import { APIGatewayProxyHandler } from "aws-lambda";
import { swaggerConfig } from "../config/swagger";

export const getSwaggerJson: APIGatewayProxyHandler = async () => {
    try{
        
        return {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(swaggerConfig),
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