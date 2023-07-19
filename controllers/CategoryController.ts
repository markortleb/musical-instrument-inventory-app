import Category from "../models/Category.js";
import expressAsyncHandler from "express-async-handler";
import express from "express";


// Database Functions

const createCategory = async (categoryId: string, name: string): Promise<void> => {
    const category = new Category({
        categoryId: categoryId,
        name: name
    });

    await category.save();
};

const getAll = async (): Promise<any> => {
    return await Category.find().exec();
};

const getByName = async (categoryName): Promise<any> => {
    return await Category.find({name: categoryName}).exec();
}


// Handlers

// const createCategoryHandlerPost: express.RequestHandler = expressAsyncHandler(
//     async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
//         await createCategory(req.body.name);
//     }
// );


const getAllHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.categories = await getAll();
        next();
    }
);

const getByNameHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {

        // There should always be only one category per name
        res.locals.category = (await getByName(req.params.name))[0];
        next();
    }
);


export {
    // Database Functions
    createCategory,
    getAll,

    // Handlers
    // createCategoryHandlerPost,
    getAllHandler,
    getByNameHandler
}