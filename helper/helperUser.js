// authentication
import bcrypt from "bcrypt";
import { client } from "../index.js"
// import { ObjectId } from "mongodb"; 


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
  export async function createUser( username, hashedPassword ){
    return await client
    .db("phone-catalog")
    .collection("users")
    .insertOne({ username: username, password: hashedPassword });
  }

  // read the username and match/validate username (signup)
  export async function getUserByName( username ){
    return await client
    .db("phone-catalog")
    .collection("users")
    .findOne({ username: username });
  }