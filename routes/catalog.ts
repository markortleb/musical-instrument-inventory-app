import express from 'express';
import * as CategoryController from '../controllers/CategoryController.js';
import * as  InventoryItemController from "../controllers/InventoryItemController.js";
import * as  ProductController from "../controllers/ProductController.js";
import capitalizeFirstLetter from "../util/capitalizeFirstLetter.js";


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
    CategoryController.getByNameHandler,
    ProductController.getByCategoryHandler,
    InventoryItemController.getByProductListHandler,
    function(req: express.Request, res: express.Response, next: express.NextFunction) {
        const enrichedInventoryItems = res.locals.inventoryItems.map(item =>{
            const product = res.locals.products.find(x => x.productId === item.productId);
            item.productName = product.name;
            item.formattedPrice = item.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            return item;
        });

        res.render(
            'category',
            {
                title: 'Musical Instrument Inventory App',
                name: capitalizeFirstLetter(req.params.name),
                inventoryItems: res.locals.inventoryItems
            }
        );
        next();
    }
);


export { router };
