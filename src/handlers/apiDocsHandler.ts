import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "../config/swagger";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export default app;