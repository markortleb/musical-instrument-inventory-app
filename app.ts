import path from 'path';
import express, { Express } from 'express';
import * as indexRouter from './routes/index';


const app: Express = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


module.exports = app;
