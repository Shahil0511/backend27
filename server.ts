
import 'dotenv/config';
import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";

const PORT = Number(process.env.PORT) || 8000;

async function start() {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });

        const gracefulShutdown = (signal?: string) => {
            console.log(`Received ${signal || 'shutdown'} - closing server`);
            server.close(() => {
                console.log('HTTP server closed');
                process.exit(0);
            });
        };

        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

        process.on('unhandledRejection', (reason) => {
            console.error('Unhandled Rejection:', reason);
        });

        process.on('uncaughtException', (err) => {
            console.error('Uncaught Exception:', err);
            process.exit(1);
        });

    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

start();




