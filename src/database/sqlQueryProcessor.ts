// import type { Request} from "express";
import {db} from "./dbConnection.js";
// import {users} from "../database/schema.js";
// import type {jsonObject} from "../types/commonTypes.js";
// import {desc} from  "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";
import type { AnySQLiteTable } from 'drizzle-orm/sqlite-core';

const sqlQueryProcessor = async<T extends AnySQLiteTable>(action: string,  model: T, requestData: any,
     modelColumn: any) => {
    try {
        if (action === 'insert') {
            const result = await db.insert(model).values(requestData);
            return Number(result.lastInsertRowid);
        }  
    } catch (error) {
        console.error("DB INSERT FAILED:", error);
    }
    
}

export default sqlQueryProcessor;

