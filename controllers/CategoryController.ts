import Category from "../models/Category.js";
import uniqid from 'uniqid';
import expressAsyncHandler from "express-async-handler";
import express from "express";
import {type} from "os";


// Database Functions

const createCategory = async (name: string): Promise<void> => {
    const category = new Category({
        name: name,
        categoryId: uniqid()
    });

    await category.save();
};

const getAll = async (): Promise<any> => {
    return await Category.find().exec();
};


// Handlers

const createCategoryHandlerPost: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        await createCategory(req.body.name);
    }
);


const getAllHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.categories = await getAll();
        next();
    }
);


export {
    // Database Functions
    createCategory,
    getAll,

    // Handlers
    createCategoryHandlerPost,
    getAllHandler
}