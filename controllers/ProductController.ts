import Product from "../models/Product.js";
import expressAsyncHandler from "express-async-handler";
import express from "express";
import Category from "../models/Category";


// Database Functions

const createProduct = async (productId: string,
                             brand: string,
                             name: string,
                             description: string,
                             categoryId: string): Promise<void> => {
    const product = new Product({
        productId: productId,
        brand: brand,
        name: name,
        description: description,
        categoryId: categoryId
    });

    await product.save();
};


const getAll = async (): Promise<any> => {
    return await Product.find().exec();
};


const getByCategoryId = async (categoryId): Promise<any> => {
    return await Product.find({ categoryId: categoryId }).exec();
};


const getById = async (productId): Promise<any> => {
    return await Product.find({ productId: productId }).exec();
};

const deleteAll = async (): Promise<any> => {
    return await Product.find().deleteMany().exec();
};


// Handlers

const getAllHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.products = await getAll();
        next();
    }
);


const getByCategoryHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.products = await getByCategoryId(res.locals.category.categoryId);
        next();
    }
);

const getByIdHandler: express.RequestHandler = expressAsyncHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        res.locals.product = (await getById(res.locals.inventoryItem.productId))[0];
        next();
    }
);


export {
    // Database Functions
    createProduct,
    getAll,
    getByCategoryId,
    getById,
    deleteAll,

    // Handlers
    getAllHandler,
    getByCategoryHandler,
    getByIdHandler
}
