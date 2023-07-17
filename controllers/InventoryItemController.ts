import InventoryItem from "../models/InventoryItem.js";
import uniqid from 'uniqid';
import expressAsyncHandler from "express-async-handler";
import express from "express";
import {type} from "os";


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


// Handlers

// const getAllHandler: express.RequestHandler = expressAsyncHandler(
//     async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
//         res.locals.categories = await getAll();
//         next();
//     }
// );

export {
    // Database Functions
    createInventoryItem,
    getAll,

    // Handlers

}
