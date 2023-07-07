import Category from "../models/Category.js";
import uniqid from 'uniqid';
import expressAsyncHandler from "express-async-handler";
import express from "express";


// Database Functions

const createCategory = (name: string): void => {
    const category = new Category({
        name: name,
        categoryId: uniqid()
    });

    category.save();
};



// Handlers

const createCategoryHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        // await createCategory(req.body.name);
    }
);


export {
    // Database Functions
    createCategory,

    // Handlers
    createCategoryHandler,
}