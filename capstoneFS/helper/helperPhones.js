import { ObjectId } from "mongodb";
import { client } from "../index.js";


export async function addPhones(newPhones){
    return await client
    .db("item_catalog")
    .collection("phones")
    .insertMany(newPhones)
}

export async function getPhones(){
    return await client
    .db("item_catalog")
    .collection("phones")
    .find()
    .toArray();
}

export async function getPhonesId(id){ 
    return await client 
    .db("item_catalog")
    .collection("phones")
    .findOne({_id: new ObjectId(id)})
}

export async function deleteById(id){
    return await client
    .db("item_catalog")
    .collection("phones")
    .deleteOne({_id: new ObjectId(id)})
}

export async function putPhones(id, updatePhones){
    return await client
    .db("item_catalog")
    .collection("phones")
    .updateOne({ _id: new ObjectId(id) }, { $set:updatePhones })
}