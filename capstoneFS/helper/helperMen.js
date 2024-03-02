import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function newMn(newCloth){
    return await client
    .db("item_catalog")
    .collection("clothMn")
    .insertMany(newCloth)
}

export async function getMn(){
    return await client
    .db("item_catalog") 
    .collection("clothMn")
    .find()
    .toArray();
}

export async function getMnById(id){
    return await client
    .db("item_catalog")
    .collection("clothMn")
    .findOne({_id: new ObjectId(id)})
}

export async function deleteMnById(id){
    return await client
    .db("item_catalog")
    .collection("clothMn")
    .deleteOne({_id: new ObjectId(id)})
}

export async function putMn(id, updateCloth){
    return await client
    .db("item_catalog")
    .collection("clothMn")
    .updateOne({_id: new ObjectId(id)}, {$set: updateCloth})
}

