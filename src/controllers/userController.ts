import type { Request, Response, NextFunction} from "express";


import {db} from "../database/dbConnection.js"

import {users} from "../database/schema.js";

import {User} from "../requests/User.js";
import { desc } from "drizzle-orm";
import { error } from "console";


const saveUser = async(request: Request, response: Response, next:NextFunction ) => {
    try {
        console.log(request.body);
        await User.parseAsync({ name: request.body.name, email: request.body.email }); 

        await db.insert(users).values({
            name: request.body.name,
            email: request.body.email
        });

        const userData = await db.select().from(users).orderBy(desc(users.id))
        .limit(1);
        
        if (!userData) {
            throw new Error("could not insert data!");
        }
        return response.json(userData);
    } catch (error) {
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