import * as CategoryController from './controllers/CategoryController.js';
import setupDatabaseConn from "./util/setupDatabaseConn.js";

setupDatabaseConn();


console.log("start");
CategoryController.createCategory('Guitars');
CategoryController.createCategory('Drums');
CategoryController.createCategory('Keyboards');
CategoryController.createCategory('Amplifiers');
CategoryController.createCategory('Accessories');