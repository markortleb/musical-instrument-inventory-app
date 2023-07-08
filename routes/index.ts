import express from 'express';
import mongoose from "mongoose";
import * as CategoryController from '../controllers/CategoryController.js';


const router: express.Router = express.Router();
// const urlencodedParser: any =  express.urlencoded({ extended: false });


router.get('/',
    CategoryController.getAllHandler,
    function(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.render(
            'index',
            {
                title: 'Musical Instrument Inventory App',
                categories: res.locals.categories
            }
        );
        next();
    }
);




export { router };
