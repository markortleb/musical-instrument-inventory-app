import * as CategoryController from './controllers/CategoryController.js';
import * as ProductController from './controllers/ProductController.js';
import * as DatabaseConnection from "./util/DatabaseConnection.js";
import uniqid from 'uniqid';


await DatabaseConnection.connect();


// Create some initial categories
const guitarsCatId: string = uniqid();
const drumsCatId: string = uniqid();
const keyboardsCatId: string = uniqid();
const amplifierCatId: string = uniqid();
const accessoriesCatId: string = uniqid();


await CategoryController.createCategory(guitarsCatId,'Guitars');
await CategoryController.createCategory(drumsCatId,'Drums');
await CategoryController.createCategory(keyboardsCatId,'Keyboards');
await CategoryController.createCategory(amplifierCatId,'Amplifiers');
await CategoryController.createCategory(accessoriesCatId,'Accessories');


// Create some initial products

const guitarProductIds = {
    gibsonLesPaulStandard: uniqid(),
    gibsonLesPaulCustom: uniqid(),
    fenderStrat: uniqid(),
    fenderAmericanVintageBass: uniqid(),
    ibanezSR500EBass: uniqid()
}

const drumIds = {
    mapexArmorySixPieceSet: uniqid()
}

const keyboardIds = {
    yamahaP_S500: uniqid(),
    yamahaP_45:uniqid()
}

const amplifierIds = {
    marshall40W: uniqid(),
    orangeCrush40W:uniqid(),
    fender10W: uniqid()
}

const accessoryIds = {
    dunlop12GuitarPicks: uniqid(),
    promarkActiveGripDrumSticks: uniqid()
}


await ProductController.createProduct(
    productId: guitarProductIds.gibsonLesPaulStandard,
    brand: 'Gibson',
    name: name,
    description: description,
    categoryId: categoryId
);


// await CategoryController.getAll();


await DatabaseConnection.disconnect();