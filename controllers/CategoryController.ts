import Category from "../models/Category.js";
import expressAsyncHandler from "express-async-handler";
import express from "express";
import {randomUUID} from "crypto";


// Database Functions

const createCategory = async (categoryId: string, name: string): Promise<void> => {
    if ((await getByName(name)).length === 0) {
        const category = new Category({
            categoryId: categoryId,
            name: name
        });

        await category.save();
    }
};

const getAll = async (): Promise<any> => {
    return await Category.find().exec();
};

const getByName = async (categoryName): Promise<any> => {
    return await Category.find({name: categoryName}).exec();
}

const deleteByName = async (categoryName): Promise<any> => {
    await Category.find({name: categoryName}).deleteMany().exec();
};

const deleteAll = async (): Promise<any> => {
    return await Category.find().deleteMany().exec();
};


// Handlers

const createCategoryHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        await createCategory(randomUUID(), req.body.categoryName);
        next();
    }
);


const getAllHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.categories = await getAll();
        next();
    }
);


const getByNameHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        console.log("hi");
        // There should always be only one category per name
        res.locals.category = (await getByName(req.params.name))[0];
        next();
    }
);


const deleteByNameHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        await deleteByName(req.params.name);
        next();
    }
);


export {
    // Database Functions
    createCategory,
    getAll,
    deleteByName,
    deleteAll,

    // Handlers
    createCategoryHandler,
    getAllHandler,
    getByNameHandler,
    deleteByNameHandler
}