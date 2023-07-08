import * as CategoryController from './controllers/CategoryController.js';
import setupDatabaseConn from "./util/setupDatabaseConn.js";

setupDatabaseConn();


await CategoryController.createCategory('Guitars');
await CategoryController.createCategory('Drums');
await CategoryController.createCategory('Keyboards');
await CategoryController.createCategory('Amplifiers');
await CategoryController.createCategory('Accessories');