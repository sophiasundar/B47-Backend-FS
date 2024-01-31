import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import cors from "cors";

dotenv.config();
const app = express()
const PORT = 8000;

app.use(cors());
app.use(express.json());


//Mongo Connection
  const MONGO_URL = process.env.mongo_url;

 async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();  
    console.log("Mongodb is Connected");
    return client; 
 }

 const client = await createConnection()



//   for starting the port
app.get('/',(req,res)=>{
    res.send('Hello World, 🙋‍♀️🌏👋');
});


//  for getting all phone's data  
app.get('/phones',async(req,res)=>{
     const phones = await client
    .db("phone-catalog")
    .collection("phones")
    .find()
    .toArray();
    res.send(phones);
});

//  for deleting phone's data by id
app.delete('/phones/:id',async(req,res)=>{
    const {id} = req.params;
    const phone = await client
   .db("phone-catalog")
   .collection("phones")
   .deleteOne({ id : id });
   res.send(phone);
});

//  for adding phones
app.post('/phones',async(req,res)=>{
    const newPhone = req.body;
    const result = await client
   .db("phone-catalog")
   .collection("phones")
   .insertMany(newPhone);
   res.send(result); 
}); 

//  for editing phones data
    // put= post and get 
app.put("/phones/:id", async (req,res)=>{
    const { id } = req.params;
    const updatePhones = req.body;
    const output = await client
   .db("phone-catalog")
   .collection("phones")
   .updateOne({id : id}, {$set: updatePhones});
   res.send(output); 
});

app.listen(PORT, ()=> 
console.log("Server started on the PORT", PORT))