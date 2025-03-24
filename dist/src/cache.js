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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToCache = exports.getCachedData = void 0;
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("./config/db"));
const TABLE_NAME = process.env.TABLE_NAME || "FusionadosCache";
const getCachedData = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date().getTime();
    const cache = yield db_1.default.scan({ TableName: TABLE_NAME }).promise();
    if (cache.Items && cache.Items.length > 0) {
        const latestEntry = cache.Items[0];
        const cacheTimestamp = new Date(latestEntry.createdAt).getTime();
        if (now - cacheTimestamp < 30 * 60 * 1000) {
            return latestEntry.data;
        }
    }
    return null;
});
exports.getCachedData = getCachedData;
const saveToCache = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const item = {
        id: (0, uuid_1.v4)(),
        data,
        createdAt: new Date().toISOString(),
    };
    yield db_1.default.put({
        TableName: TABLE_NAME,
        Item: item,
    }).promise();
});
exports.saveToCache = saveToCache;
