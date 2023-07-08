import * as CategoryController from './controllers/CategoryController.js';
import * as DatabaseConnection from "./util/DatabaseConnection.js";


await DatabaseConnection.connect();


// await CategoryController.createCategory('Guitars');
// await CategoryController.createCategory('Drums');
// await CategoryController.createCategory('Keyboards');
// await CategoryController.createCategory('Amplifiers');
// await CategoryController.createCategory('Accessories');


await CategoryController.getAll();


await DatabaseConnection.disconnect();