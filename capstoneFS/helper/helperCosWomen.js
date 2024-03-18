import { client } from "../index.js"
import { ObjectId } from "mongodb";

export async function newCosw(newCos){
    return await client
    .db("item_catalog")
    .collection("cosWomen")
    .insertMany(newCos)
}

export async function getCosW(){
    return await client
    .db("item_catalog") 
    .collection("cosWomen")
    .find()
    .toArray();
}

export async function getCosWomen(query){
    return await client
    .db("item_catalog") 
    .collection("cosWomen")
    .find(query)
    .toArray();
}

export async function getByIdWomen(id){
    return await client
    .db("item_catalog")
    .collection("cosWomen")
    .findOne({_id: new ObjectId(id)})
}

export async function deleteByIdWo(id){
    return await client
    .db("item_catalog")
    .collection("cosWomen")
    .deleteOne({_id: new ObjectId(id)})
}

export async function putCosWomen(id, updateCosWomen){
    return await client
    .db("item_catalog")
    .collection("cosWomen")
    .updateOne({_id: new ObjectId(id)}, {$set: updateCosWomen})
}

