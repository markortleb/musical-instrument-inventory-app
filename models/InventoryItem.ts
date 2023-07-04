import mongoose, { Schema, model, Document } from "mongoose";


interface IInventoryItem extends Document{
    name: string,
    description: string,
    price: number
}


const InventoryItemSchema = new Schema<IInventoryItem> (
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
    }
);



InventoryItemSchema.virtual('url').get( function() {
    return '/inventoryitem/' + this._id;
});

const InventoryItem = model<IInventoryItem>('inventory_item', InventoryItemSchema);


export default InventoryItem;
