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

  export async function findById(userId) {
    return await client
        .db("item_catalog")
        .collection("wistlists")
        .find(userId)
        .toArray();
}
  

// export async function addProductToWishlist(userId, newProduct) {
//   try {
//     const database = client.db("item_catalog");
//     const collection = database.collection("wistlists");
 
//     const user = await collection.findOne({ _id: userId });
//     if (!user) {
//       throw new Error("User not found"); 
//     }
//     user.wishlist.push(newProduct);

//   await collection.updateOne({ _id: userId }, { $set: { wishlist: user.wishlist } });

//     console.log("Product added to wishlist");
//   }   
//   catch (err) {
//     console.error(err);
//     throw err; 
//   }
// }