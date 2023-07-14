import Product from "../models/Product.js";
import uniqid from 'uniqid';
import expressAsyncHandler from "express-async-handler";
import express from "express";
import {type} from "os";


// Database Functions

const createProduct = async (productId: string,
                             brand: string,
                             name: string,
                             description: string,
                             categoryId: string): Promise<void> => {
    const product = new Product({
        productId: name,
        brand: brand,
        name: name,
        description: description,
        categoryId: categoryId
    });

    await product.save();
};

// const getAll = async (): Promise<any> => {
//     return await Category.find().exec();
// };


// Handlers



export {
    // Database Functions
    createProduct,
    // getAll,
}