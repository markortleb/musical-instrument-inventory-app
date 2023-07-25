import express from 'express';
import * as CategoryController from '../controllers/CategoryController.js';
import * as InventoryItemController from "../controllers/InventoryItemController.js";
import * as ProductController from "../controllers/ProductController.js";
import capitalizeFirstLetter from "../util/capitalizeFirstLetter.js";


const router: express.Router = express.Router();


router.get('/',
    CategoryController.getAllHandler,
    function(req: express.Request, res: express.Response, next: express.NextFunction) {
        const enrichedCategories = res.locals.categories.map(item => {
            item.name = capitalizeFirstLetter(item.name);
            return item;
        });
        res.render(
            'index',
            {
                title: 'Musical Instrument Inventory App',
                categories: enrichedCategories
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


router.get('/inventoryitem/:inventoryitemid',
    InventoryItemController.getByIdHandler,
    ProductController.getByIdHandler,
    function(req: express.Request, res: express.Response, next: express.NextFunction) {
        let formattedPrice = res.locals.inventoryItem.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        res.render(
            'inventoryItem',
            {
                title: 'Musical Instrument Inventory App',
                inventoryItem: res.locals.inventoryItem,
                formattedPrice: formattedPrice,
                product: res.locals.product
            }
        );
        next();
    }
);



router.get('/create/category',
    function(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.render(
            'createCategory',
            {
                title: 'Musical Instrument Inventory App',
            }
        );
        next();
    }
);


router.post('/create/category',
    CategoryController.createCategoryHandler,
    function(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.redirect('/catalog');
        next();
    }
);



router.get('/category/:name/createInventoryItem/',
    function(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.render(
            'createInventoryItem',
            {
                title: 'Musical Instrument Inventory App',
            }
        );
        next();
    }
);


router.get('/delete/category/:name',
    CategoryController.deleteByNameHandler,
    function(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.redirect('/catalog');
        next();
    }
);


export { router };
