import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "FusionadosCache";

export const getCachedData = async (): Promise<any | null> => {
  const now = new Date().getTime();
  const cache = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();

  if (cache.Items && cache.Items.length > 0) {
    const latestEntry = cache.Items[0];
    const cacheTimestamp = new Date(latestEntry.createdAt).getTime();

    if (now - cacheTimestamp < 30 * 60 * 1000) {
      return latestEntry.data;
    }
  }
  return null;
};

export const saveToCache = async (data: any) => {
  const item = {
    id: uuidv4(),
    data,
    createdAt: new Date().toISOString(),
  };

  await dynamoDB.put({
    TableName: TABLE_NAME,
    Item: item,
  }).promise();
};