import mongoose, { Schema, model, Document } from "mongoose";


interface IInventoryItem extends Document{
    id: string,
    name: string,
    description: string,
    price: number
}


const inventoryItemSchema = new Schema<IInventoryItem> ({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});


const InventoryItem = model<IInventoryItem>('InventortyItem', inventoryItemSchema);

export default InventoryItem;
