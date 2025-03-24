import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto";

export const generateToken = (username: string): string => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
};