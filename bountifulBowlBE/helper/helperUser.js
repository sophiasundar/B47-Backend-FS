import bcrypt from "bcrypt";
import { client } from "../index.js"
import { ObjectId } from "mongodb";


// for generating the password 
export async function genPassword(password){
    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(hashedPassword);
       return hashedPassword;
}

// create user and validate password while posting itself (signup)
    export async function createUser(name, email, hashedPassword, role ){
        return await client
        .db("bountiful")
        .collection("users")
        .insertOne({name:name, email: email, password: hashedPassword, role:role});
    }

// read the email and match and validate email (signup/register)
    export async function getUserEmail( email ){
        return await client
        .db("bountiful")
        .collection("users")
        .findOne({email: email})
    }

    
// authorization
    


    // export async function getById( id ){
    //   const user = await client
    //     .db("bountiful")
    //     .collection("users")
    //     .findOne({_id: new ObjectId(id)})
    //    if (user){
    //       delete user.password;
    //    }
    //     return user;
    // }

