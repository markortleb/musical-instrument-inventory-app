import InventoryItem from "../models/InventoryItem.js";



export default async function createInventoryItem() {
    const inventoryItem = new InventoryItem({
        inventoryItemId: 'test2',
        price: 1233.0
    });

    await inventoryItem.save();
}