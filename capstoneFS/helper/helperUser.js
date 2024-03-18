import bcrypt from "bcrypt";
import { client } from "../index.js"

//  for generating the password
export async function genPassword(password){
    const salt = await bcrypt.genSalt(10);   
    //  bcrypt.genSalt(no.of.rounds); random salt will be generated
    // salt = random string
    // hashed password = salt + password
    console.log(salt);  
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;
  }

  // create user and validate password while posting itself (signup)
  export async function createUser( email, hashedPassword ){
    return await client
    .db("item_catalog")
    .collection("users")
    .insertOne({ email: email, password: hashedPassword });
  }

  // read the email and match/validate email (signup)
  export async function getUserEmail( email ){
    return await client
    .db("item_catalog")
    .collection("users")
    .findOne({ email: email });
  }