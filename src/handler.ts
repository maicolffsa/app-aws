import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

// Configurar DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "FusionadosCache";
