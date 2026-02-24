import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI;

mongoose.set('strictQuery', false);

export const connectDB = async (): Promise<mongoose.Connection> => {
    if (!mongoUri) {
        throw new Error('MONGO_URI is not set');
    }

    try {
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn.connection;
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error?.message || error);
        throw error;
    }
};

export const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (err) {
        console.error('Error during MongoDB disconnect', err);
    }
};

