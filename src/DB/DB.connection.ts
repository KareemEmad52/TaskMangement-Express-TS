import mongoose from "mongoose";

export const DB_CONNECTION = async (): Promise<typeof mongoose> => {
  try {
    const connection = await mongoose.connect(process.env.DBCONNECTION as string);
    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;  // Make sure to handle the error properly
  }
};
