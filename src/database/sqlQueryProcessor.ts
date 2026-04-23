// import type { Request} from "express";
import {db} from "./dbConnection.js";
// import {users} from "../database/schema.js";
// import type {jsonObject} from "../types/commonTypes.js";
import {desc, eq} from  "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";
import type { AnySQLiteTable } from 'drizzle-orm/sqlite-core';

const sqlQueryProcessor = async<T extends AnySQLiteTable>(action: string,  model: T, requestData?: any,
     modelColumn?: any, filter?: any, filterValue?: any) => {
    let result = null;
    try {
        if (action === 'insert') {
            await db.insert(model).values(requestData);
            result = await db.select().from(model).orderBy(desc(modelColumn)) .limit(1);
            //return Number(result.lastInsertRowid);
        } else if (action === 'select') {
            result = await db.select().from(model);
        }  else if (action === 'select_by_id') {
            result = await db.select().from(model).where(eq(filter, filterValue));;
        }  
        return result;

    } catch (error) {
        console.error("DB INSERT FAILED:", error);
    }
    
}

export default sqlQueryProcessor;

