import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function newWn(newCloth){
    return await client
    .db("item_catalog")
    .collection("clothWomen")
    .insertMany(newCloth)
}

export async function getWon(){
    return await client
    .db("item_catalog") 
    .collection("clothWomen")
    .find()
    .toArray();
}

export async function getWonCloth(query){
    return await client
    .db("item_catalog") 
    .collection("clothWomen")
    .find(query)
    .toArray();
}

export async function getWnById(id){
    return await client
    .db("item_catalog")
    .collection("clothWomen")
    .findOne({_id: new ObjectId(id)})
}

export async function deleteWnById(id){
    return await client
    .db("item_catalog")
    .collection("clothWomen")
    .deleteOne({_id: new ObjectId(id)})
}

export async function putWn(id, updateCloth){
    return await client
    .db("item_catalog")
    .collection("clothWomen")
    .updateOne({_id: new ObjectId(id)}, {$set: updateCloth})
}

