import mongoose, { Schema, model, Document } from "mongoose";


interface IInventoryItem extends Document{
    inventoryItemId: string,
    productId: string,
    price: number
}


const InventoryItemSchema = new Schema<IInventoryItem> (
    {
        inventoryItemId: {type: String, required: true},
        productId: {type: String, required: true},
        price: {type: Number, required: true},
    }
);


InventoryItemSchema.virtual('url').get( function() {
    return '/inventoryitem/' + this.inventoryItemId;
});

const InventoryItem = model<IInventoryItem>('inventory_item', InventoryItemSchema);


export default InventoryItem;
