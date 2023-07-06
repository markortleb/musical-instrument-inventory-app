import mongoose, { Schema, model, Document } from "mongoose";


interface IProduct extends Document{
    productId: string,
    brand: string,
    name: string,
    description: string,
    categoryId: string,
    subCategoryId: string
}


const ProductSchema = new Schema<IProduct> (
    {
        productId: {type: String, required: true},
        brand: {type: String, required: true},
        name: {type: String, required: true},
        description: {type: String, required: true},
        categoryId: {type: String, required: true},
        subCategoryId: {type: String, required: true}
    }
);


ProductSchema.virtual('url').get( function() {
    return '/product/' + this.productId;
});

const Product = model<IProduct>('product', ProductSchema);


export default Product;
