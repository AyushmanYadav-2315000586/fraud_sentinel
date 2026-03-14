import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT : number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});