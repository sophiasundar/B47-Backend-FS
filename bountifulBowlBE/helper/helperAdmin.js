import { ObjectId } from "mongodb";
import { client } from "../index.js";


export async function getAllUsers(){
    return await client
    .db("bountiful")
    .collection("users")
    .find({}, {projection: { password: 0 }} )
    .toArray();
}

export async function getUsersById(id){
    return await client
    .db("bountiful")
    .collection("users")
    .findOne({_id: new ObjectId(id)})
}

export async function createUser(name, email, role) {
    const newUser = {
        name, 
        email, 
        role, 
        createdAt: new Date()
    };

    return await client
        .db("bountiful")
        .collection("users")
        .insertOne(newUser);
}


export async function deleteUser(id){
    return await client
    .db("bountiful")
    .collection("users")
    .deleteOne({_id: new ObjectId(id)})
}

export async function updateUser(id, updatedUser){
    return await client
    .db("bountiful")
    .collection("users")
    .updateOne({_id: new ObjectId(id)}, {$set:updatedUser})
}