// lib/db.ts
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Failed to connect to the database");
  }
};