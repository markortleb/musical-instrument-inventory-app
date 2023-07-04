import mongoose, { Schema, model, Document } from "mongoose";


interface ICategory extends Document{
    categoryId: string,
    name: string
}


const CategorySchema = new Schema<ICategory> (
    {
        categoryId: {type: String, required: true},
        name: {type: String, required: true}
    }
);


CategorySchema.virtual('url').get( function() {
    return '/category/' + this.categoryId;
});

const Category = model<ICategory>('category', CategorySchema);


export default Category;
