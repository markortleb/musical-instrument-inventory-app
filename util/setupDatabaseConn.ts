import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getMongoConnString(): string {
    interface ConnInfo {
        username: string,
        password: string,
        hostname: string
    }

    const dbConnInfo: ConnInfo = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../../db_conn_info/db_conn_info.json'), 'utf-8')
    );

    return `mongodb+srv://${dbConnInfo.username}:${dbConnInfo.password}@${dbConnInfo.hostname}/?retryWrites=true&w=majority&ssl=true`;
}


function setupDatabaseConn() {
    const connString = getMongoConnString();

    mongoose.set('strictQuery', false);
    main().catch((err) => console.log(err));
    async function main() {
        await mongoose.connect(connString);
    }
}



export default setupDatabaseConn;
