import express, { Application, Request, Response, NextFunction } from "express";
import router from "./module/auth/auth.routes.js";
import customerRoute from "./module/customers/customer.routes.js"
import categoryRoute from "./module/category/category.routes.js";
import subCategoryRoute from "./module/subCategory/subCategory.routes.js"
import { errorMiddleware } from "./middleware/error.middleware.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app: Application = express();

// Basic settings
app.set('trust proxy', 1);

// Security & parsing middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logging
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

// Health check
app.get('/health', (_req: Request, res: Response) => {
	res.json({ status: 'ok' });
});

// API routes
app.use('/api/auth', router);
app.use('/api/customer',customerRoute)
app.use('/api/category',categoryRoute )
app.use('/api/sub-category',subCategoryRoute )

// 404 handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
	const err = new Error('Not Found');
	// pass to error middleware
	next(err);
});

// Error handler (centralized)
app.use(errorMiddleware);

export default app;
