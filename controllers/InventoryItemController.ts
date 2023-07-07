import expressAsyncHandler from "express-async-handler";
import InventoryItem from "../models/InventoryItem.js";
import express from "express";



const createInventoryItem: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const inventoryItem = new InventoryItem({
            inventoryItemId: 'test2',
            price: 1233.0
        });

        await inventoryItem.save();
});


export {
    createInventoryItem
}

