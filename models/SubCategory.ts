import mongoose, { Schema, model, Document } from "mongoose";


interface ISubCategory extends Document{
    subCategoryId: string,
    name: string
}


const SubCategorySchema = new Schema<ISubCategory> (
    {
        subCategoryId: {type: String, required: true},
        name: {type: String, required: true}
    }
);


SubCategorySchema.virtual('url').get( function() {
    return '/subcategory/' + this.subCategoryId;
});

const SubCategory = model<ISubCategory>('subcategory', SubCategorySchema);


export default SubCategory;
