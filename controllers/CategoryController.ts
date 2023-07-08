import Category from "../models/Category.js";
import uniqid from 'uniqid';
import expressAsyncHandler from "express-async-handler";
import express from "express";


// Database Functions

const createCategory = async (name: string): Promise<void> => {
    const category = new Category({
        name: name,
        categoryId: uniqid()
    });

    await category.save();
};



// Handlers

const createCategoryHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        await createCategory(req.body.name);
    }
);


export {
    // Database Functions
    createCategory,

    // Handlers
    createCategoryHandler,
}