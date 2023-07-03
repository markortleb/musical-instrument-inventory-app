import * as path from 'path';
import * as fs from 'fs';
import * as express from "express";
import * as indexRouter from './routes/index';


function getMongoConnString(): string {
    interface ConnInfo {
        username: string,
        password: string,
        hostname: string
    }

    const dbConnInfo: ConnInfo = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../db_conn_info/db_conn_info.json'), 'utf-8')
    );

    return `mongodb+srv://${dbConnInfo.username}:${dbConnInfo.password}@${dbConnInfo.hostname}`;
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


export = app;
