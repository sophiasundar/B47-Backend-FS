import { ObjectId } from "mongodb";
import { client } from "../index.js"

export async function newCosmetics(newCos){
    return await client
    .db("item_catalog")
    .collection("cosmen")
    .insertOne(newCos)
}

export async function getCos(){
    return await client
    .db("item_catalog") 
    .collection("cosmen")
    .find()
    .toArray();
}

export async function getCosMen(query){
    return await client
    .db("item_catalog") 
    .collection("cosmen")
    .find(query)
    .toArray();
}

export async function getById(id){
    return await client
    .db("item_catalog")
    .collection("cosmen")
    .findOne({_id: new ObjectId(id)})
}

export async function deleteById(id){
    return await client
    .db("item_catalog")
    .collection("cosmen")
    .deleteOne({_id: new ObjectId(id)})
}

export async function putCosMen(id, updateCosMen){
    return await client
    .db("item_catalog")
    .collection("cosmen")
    .updateOne({_id: new ObjectId(id)}, {$set: updateCosMen})
}

