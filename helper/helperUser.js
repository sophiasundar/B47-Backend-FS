import bcrypt from "bcrypt";
import { client } from "../index.js"
// import { ObjectId } from "mongodb"; 



export async function genPassword(password){
    const salt = await bcrypt.genSalt(10);   
    //  bcrypt.genSalt(no.of.rounds); random salt will be generated
    console.log(salt);  
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;
  }

  export async function createUser( username, hashedPassword ){
    return await client
    .db("phone-catalog")
    .collection("users")
    .insertOne({ username: username, password: hashedPassword });
  }

  export async function getUserByName( username ){
    return await client
    .db("phone-catalog")
    .collection("users")
    .findOne({ username: username });
  }