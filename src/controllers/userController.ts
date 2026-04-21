import type { Request, Response, NextFunction} from "express";


import {db} from "../database/dbConnection.js"

import {users} from "../database/schema.js";

import {User} from "../requests/User.js";
import { desc } from "drizzle-orm";
import { error } from "console";
import sqlQueryProcessor from "../database/sqlQueryProcessor.js"


const saveUser = async(request: Request, response: Response, next:NextFunction ) => {
    try {
        console.log(request.body);
        await User.parseAsync({ name: request.body.name, email: request.body.email }); 
        const { name, email } = request.body;
        const data = {
                name ,
                email
            };
        if (!request.body.name || !request.body.email) {
            throw new Error("Missing fields");
        }
        const resId = await sqlQueryProcessor('insert', users, { name: request.body.name.toString() , email: request.body.email.toString() } ,users.id);
        if (!resId) {
            throw new Error("could not insert data!");
        }
        return response.json({"data":resId});
    } catch (error) {
        console.error(error);
        next(error);
    }
    
}

const getUser =  async (request: Request, response: Response, next:NextFunction) => {
    const userData = await db.select().from(users);
    
    if (!userData) {
        throw new Error("could not get data!");
    }
    return response.json(userData);
}

export {saveUser, getUser};