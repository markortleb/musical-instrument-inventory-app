import express from 'express';
import mongoose from "mongoose";
import {createInventoryItem} from '../controllers/InventoryItemController.js';


const router: express.Router = express.Router();
// const urlencodedParser: any =  express.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
    res.render(
        'index',
        {
            title: 'Musical Instrument Inventory App'
        }
    );
    console.log("Hi");
    createInventoryItem(req, res, next);
    next();
});




export { router };
