import express from 'express';
import * as CategoryController from '../controllers/CategoryController.js';
import * as  InventoryItemController from "../controllers/InventoryItemController.js";


const router: express.Router = express.Router();



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


router.get('/category/:name',
    InventoryItemController.getByCategoryHandler,
    function(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(res.locals.categories);
        res.render(
            'category',
            {
                title: 'Musical Instrument Inventory App',
                name: req.params.name,
                inventoryItems: []
            }
        );
        next();
    }
);


export { router };
