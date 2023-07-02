import * as path from 'path';
import * as express from "express";
import * as indexRouter from './routes/index';


const app: express.Express = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, './public')));

app.use('/', indexRouter);


export = app;
