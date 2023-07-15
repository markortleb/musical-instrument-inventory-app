import * as CategoryController from './controllers/CategoryController.js';
import * as ProductController from './controllers/ProductController.js';
import * as InventoryItemController from "./controllers/InventoryItemController.js";
import * as DatabaseConnection from "./util/DatabaseConnection.js";
import * as fs from 'fs';
import {parse} from 'csv-parse';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function loadCSV(inputPath: string) {

    return new Promise((resolve, reject) => {

        let readStream = fs.createReadStream(inputPath);

        let fileRows = [];
        const parser = parse({
            delimiter: ',',
            escape: '\\',
            ltrim: true,
            rtrim: true,
            columns: true
        });

        // Use the readable stream api
        parser.on('readable', function () {
            let record;
            while (record = parser.read()) {
                if (record) { fileRows.push(record); }
            }
        });

        // Catch any error
        parser.on('error', function (err) {
            console.error(err.message)
        });

        parser.on('end', function () {
            const { lines } = parser.info;
            // RESOLVE OUTPUT THAT YOU WANT AT PARENT-LEVEL
            resolve(fileRows);
        });

        // This will wait until we know the readable stream is actually valid before piping
        readStream.on('open', function () {
            // This just pipes the read stream to the response object (which goes to the client)
            readStream.pipe(parser);
        });

        // This catches any errors that happen while creating the readable stream (usually invalid names)
        readStream.on('error', function (err) {
            resolve({ status: null, error: 'readStream error' + err });
        });
    });
}


await DatabaseConnection.connect();

let initialCategories = await loadCSV(path.join(__dirname, '../seeds/initialCategories.csv'));
let initialProducts = await loadCSV(path.join(__dirname, '../seeds/initialProducts.csv'));
let initialInventoryItems = await loadCSV(path.join(__dirname, '../seeds/initialInventoryItems.csv'));


await DatabaseConnection.connect();

//@ts-ignore
initialCategories.forEach(async item => {
    await CategoryController.createCategory(item.categoryId, item.name);
});

// @ts-ignore
await initialProducts.forEach(async item => {
    await ProductController.createProduct(
        item.productId,
        item.brand,
        item.name,
        item.description,
        item.categoryId
    );
});

// @ts-ignore
initialInventoryItems.forEach(async item => {
    await InventoryItemController.createInventoryItem(item.inventoryItemId, item.productId, item.price);
});


// Records are still being written to mongo at this time. As a hack, wait 5 seconds before disconnecting.
setTimeout(() => {
    DatabaseConnection.disconnect();
}, 5000)


