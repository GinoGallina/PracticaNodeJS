import express from 'express';
import userRouter from '../routes/user-routes.js';

const expressApp= express();


// Añado Middelware
expressApp.use(express.json());
expressApp.use(express.text());

// Rutas
expressApp.use('/user',userRouter)

export default expressApp;