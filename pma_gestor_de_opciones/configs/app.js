'use strict';

import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan'; 
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { dbConnection } from './db.configurations.js';
import { apiRateLimiter } from './rateLimit.configuration.js';
import fieldRoutes from '../src/fields/field.routes.js';
import { errorHandler } from '../middlewares/handle-errors.js';

const BASE_PATH = '/kinalSportsAdmin/v1';

const routes = (app)=>{
    app.use(`${BASE_PATH}/fields`, fieldRoutes);
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({
            stastus: 'Healty',
            timeStamp: new Date().toISOString(),
            service: 'kinal Sports Admin Server'
        })
    })
    app.use((req, res) => {
        res.status(404).json({
            status: 'false',
            message: 'Endpoint no encopntrado'
        })

    })
}

const middlewares = (app) => {
    app.use(express.json({limit: '10mb'}));
    app.use(express.urlencoded({extended: false, limit: '10mb'}));
    app.use(cors(corsOptions));
    app.use(helmet(helmetOptions));
    app.use(morgan('dev'));
    app.use(apiRateLimiter);
}

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trust proxy', 1);

    try{
        middlewares(app);
        routes(app);
        await dbConnection();
        app.use(errorHandler);
        app.listen(PORT, () => {
            console.log(`server running on port: ${PORT}`);
            console.log(`Health check endpoint: http://localhost:${PORT}${BASE_PATH}/health`);
        })
    }catch(err){
        console.error(`kinal Sports - Error al inicial el servidor: ${err.message}`);
        process.exit(1);
    }
}
