import express from 'express';
import cors from 'cors';

// Create an instance of the Express application
const app : any = express();

/**
 * All the middlewares will be defined here.
 */
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


/**
 * Routes for API endpoints will be defined here.
 */
app.get('/', (req : any,res : any)=>{
    res.send('Welcome to Fraud Sentinel API..');
});

// Export the app instance to be used in server.ts
export default app;
