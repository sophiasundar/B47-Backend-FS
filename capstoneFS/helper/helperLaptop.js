import { client } from "../index.js"
import {  ObjectId } from "mongodb"; 


export async function  addLaptop(newLaptop) {
    return await client
        .db("item_catalog")
        .collection("laptop")
        .insertMany(newLaptop);
}

export async function getlaps() {
    return await client
        .db("item_catalog")
        .collection("laptop")
        .find()
        .toArray();
}

export async function getLaptop(query) {
    return await client
        .db("item_catalog")
        .collection("laptop")
        .find(query)
        .toArray();
}

export async function getLaptopId(id){
    return await client
      .db("item_catalog")
      .collection("laptop")
      .findOne({_id: new ObjectId(id) });
}

export async function deleteLapId(id){
    return await client
      .db("item_catalog")
      .collection("laptop")
      .deleteOne({_id: new ObjectId(id) });
}

export async function putLaps(id, updateLaptops){
    return await client
      .db("item_catalog")
      .collection("laptop")
      .updateOne({_id: new ObjectId(id)} , { $set: updateLaptops} );
}