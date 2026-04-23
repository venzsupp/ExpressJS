import type { Request, Response, NextFunction} from "express";


import {db} from "../database/dbConnection.js"

import {users} from "../database/schema.js";

import {User} from "../requests/User.js";
import { desc ,eq} from "drizzle-orm";
import { error } from "console";
import sqlQueryProcessor from "../database/sqlQueryProcessor.js"


const saveUser = async(request: Request, response: Response, next:NextFunction ) => {
    try {
        if (!request.body.name || !request.body.email) {
            throw new Error("Missing fields");
        }
        await User.parseAsync({ name: request.body.name, email: request.body.email }); 
        const { name, email } = request.body;
        const data = {
                name ,
                email
            };
        
        const resSql = await sqlQueryProcessor('insert', users, data ,users.id);
        if (!resSql) {
            throw new Error("could not insert data!");
        }
        //const resId = Number(resSql);
        return response.json(resSql);
    } catch (error) {
        console.error(error);
        next(error);
    }
    
}

const getUser =  async (request: Request, response: Response, next:NextFunction) => {
    
    const resSql = await sqlQueryProcessor('select', users);
    
    if (!resSql) {
        throw new Error("could not get data!");
    }
    return response.json(resSql);
}

const getUserById = async (request: Request, response: Response, next:NextFunction) => {
    let resSql = null;
    if (request.params.userId) {
        const user_id = Number(request.params.userId) ?? 0;
        resSql = await sqlQueryProcessor('select_by_id', users, null,  null, users.id, user_id);
    }
    return response.json(resSql);
}

export {saveUser, getUser, getUserById};