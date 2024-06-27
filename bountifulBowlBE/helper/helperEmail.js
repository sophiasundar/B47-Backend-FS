// import { ObjectId } from "mongodb";
import { client } from '../index.js';

export async function getBanquetEmail(){
    try{
        const banquets = await client
        .db("bountiful")
        .collection("food")
        .find()
        .toArray();
        const emails = banquets.map((banquet) => banquet.email);
        return emails;
    }catch(error){
        console.error('Error fetching emails:', error);
        throw error;
    }
    
    
}