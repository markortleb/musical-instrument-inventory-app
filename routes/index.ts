import express from 'express';
import InventoryItem from "../models/InventoryItem";

const router: express.Router = express.Router();
// const urlencodedParser: any =  express.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
    res.render(
        'index',
        {
            title: 'Musical Instrument Inventory App'
        }
    );
    next();
});


export { router };
