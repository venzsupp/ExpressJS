import type { Request, Response } from "express";


import {db} from "../database/dbConnection.js"

import {users} from "../database/schema.js";

import {User} from "../models/User.js";


const saveUser = async(request: Request, response: Response) => {
    
    // console.log(process.env.DATABASE_URL);
    // await db.insert(users).values({ 
    //     name: 'Andrew', 
    //     age: 25 
    //   });
    // const result = await db.all('select * from users');
    // console.log('result');
    // console.log(result);
    // const arr = new Map();
    // arr.set('id', 1);
    // console.log('==hhhh==');
    try {
        await User.parseAsync({ name: request.body.name, email: request.body.email }); 

        await db.insert(users).values({
            name: 'Andrew',
            email: 'andrew@example.com'
        });
        return response.json({'id':2});
    } catch (Execption ex) {
        
    }
    
}

export {saveUser};