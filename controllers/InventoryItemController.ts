import InventoryItem from "../models/InventoryItem.js";
import Category from "../models/Category.js";
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

const getByCategory = async (categoryName): Promise<any> => {
    return await Category.find({name: categoryName}).exec();
}


// Handlers

const getAllHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.categories = await getAll();
        next();
    }
);

const getByCategoryHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.categories = await getByCategory(req.params.name);
        next();
    }
);

export {
    // Database Functions
    createInventoryItem,
    getAll,
    getByCategory,

    // Handlers
    getByCategoryHandler
}
