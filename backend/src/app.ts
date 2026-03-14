import express from 'express';
import cors from 'cors';

const app : any = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req : any,res : any)=>{
    res.send('Welcome to Fraud Sentinel API..');
});

export default app;
