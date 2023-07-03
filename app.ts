import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import {router as indexRouter} from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getMongoConnString(): string {
    interface ConnInfo {
        username: string,
        password: string,
        hostname: string
    }

    const dbConnInfo: ConnInfo = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../db_conn_info/db_conn_info.json'), 'utf-8')
    );

    return `mongodb+srv://${dbConnInfo.username}:${dbConnInfo.password}@${dbConnInfo.hostname}/?retryWrites=true&w=majority`;
}


async function setupDatabaseConn(): Promise<boolean> {
    const connString =getMongoConnString();

    mongoose.set('strictQuery', false);
    main().catch((err) => console.log(err));
    async function main() {
        await mongoose.connect(connString);
    }

    return true;
}


function createApp(): express.Express {
    const newApp: express.Express = express();

    newApp.set('views', path.join(__dirname, '../views'));
    newApp.set('view engine', 'pug');

    newApp.use(express.static(path.join(__dirname, './public')));

    newApp.use('/', indexRouter);

    return newApp;
}


const app: express.Express = createApp();

await setupDatabaseConn();


export {app} ;
