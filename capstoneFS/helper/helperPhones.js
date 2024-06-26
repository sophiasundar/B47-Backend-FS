import { ObjectId } from "mongodb";
import { client } from "../index.js";


export async function addPhones(newPhones){
    return await client
    .db("item_catalog")
    .collection("phones")
    .insertOne(newPhones)
}

export async function getphns(){
    return await client
    .db("item_catalog")
    .collection("phones")
    .find()
    .toArray();
}

export async function getPhones(query){
    return await client
    .db("item_catalog")
    .collection("phones")
    .find(query)
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