import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function addFoodList(newfoodList){
    return await client
    .db("bountiful")
    .collection("food")
    .insertOne(newfoodList)
}

export async function getFoods(){
    return await client
    .db("bountiful")
    .collection("food")
    .find()
    .toArray();
}

export async function getFoodId(id){
    return await client
    .db("bountiful")
    .collection("food")
    .findOne({_id: new ObjectId(id)})
}

export async function deleteById(id){
    return await client
    .db("bountiful")
    .collection("food")
    .deleteOne({_id: new ObjectId(id)})
}

export async function putFood(id, updateFoods){
    return await client
    .db("bountiful")
    .collection("food")
    .updateOne({_id: new ObjectId(id)}, {$set:updateFoods})
}