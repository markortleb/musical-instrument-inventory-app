import InventoryItem from "../models/InventoryItem.js";
import expressAsyncHandler from "express-async-handler";
import express from "express";


// Database Functions

const createInventoryItem = async (inventoryItemId: string,
                             productId: string,
                             price: string
                            ): Promise<void> => {
    const inventoryItem = new InventoryItem({
        inventoryItemId: inventoryItemId,
        productId: productId,
        price: price
    });

    await inventoryItem.save();
};

const getAll = async (): Promise<any> => {
    return await InventoryItem.find().exec();
};

const getByProductIdList = async (productIdList): Promise<any> => {
    return await InventoryItem.find(
        {productId:
            {
                '$in': productIdList
            }
        }
    ).exec();
};


const getById = async (inventoryItemId): Promise<any> => {
    return await InventoryItem.find({inventoryItemId: inventoryItemId}).exec();
};


// Handlers

const getAllHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.inventoryItems = await getAll();
        next();
    }
);


const getByProductListHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        const productIdList = [... new Set(res.locals.products.map(item => item.productId))];
        console.log(productIdList);
        res.locals.inventoryItems = await getByProductIdList(productIdList);
        next();
    }
);

const getByIdHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.inventoryItem = (await getById(req.params.inventoryitemid))[0];
        next();
    }
);


export {
    // Database Functions
    createInventoryItem,
    getAll,
    getByProductIdList,

    // Handlers
    getAllHandler,
    getByProductListHandler,
    getByIdHandler
}
