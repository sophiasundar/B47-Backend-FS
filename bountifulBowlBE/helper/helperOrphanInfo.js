import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function addOrphManager(newInfo){
    return await client
    .db("bountiful")
    .collection("orphanageInfo")
    .insertOne(newInfo)
}

export async function getOrphManagers(){
    return await client
    .db("bountiful")
    .collection("orphanageInfo")
    .find()
    .toArray();
}

export async function getOrphId(id){
    return await client
    .db("bountiful")
    .collection("orphanageInfo")
    .findOne({_id : new ObjectId(id)});
}

export async function putOrph(id, updateOrph){
    return await client
    .db("bountiful")
    .collection("orphanageInfo")
    .updateOne({_id: new ObjectId(id)}, {$set:updateOrph})
}


export async function deleteById(id){
    return await client
    .db("bountiful")
    .collection("orphanageInfo")
    .deleteOne({_id: new ObjectId(id)})
}