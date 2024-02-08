import express from "express";
import { MongoClient } from "mongodb";
import mongo from "mongodb";
import * as dotenv from 'dotenv';
import cors from "cors";

dotenv.config();
const app = express()
const PORT = 8000;

app.use(cors());



//Mongo Connection
  const MONGO_URL = process.env.mongo_url;

 async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();  
    console.log("Mongodb is Connected");
    return client; 
 }

 const client = await createConnection()

 app.use(express.json());

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
//  in postman give array and single obj
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
    //  in postman only single obj not within array
app.put("/phones/:id", async (req,res)=>{
    const { id } = req.params;
    const updatePhones = req.body;
    console.log(updatePhones);
    const output = await client
   .db("phone-catalog")
   .collection("phones")
   .updateOne({id : id}, {$set: updatePhones});
    res.send(output); 
});
   
    //  for editing phones
    // need to use body-parser
    // app.use(bodyParser.urlencoded({ extended: true }))
    // app.use(bodyParser.json())
    // app.put("/phones/:id", async (req,res)=>{
    //     const _id = mongo.ObjectId(req.params.id);
    //     const updatePhones = req.body;
    //     console.log(updatePhones);
    //     const output = await client
    //    .db("phone-catalog")
    //    .collection("phones")
    //    .updateOne({id : _id}, {$set: updatePhones});
    //     res.send(output); 
    // });

app.listen(PORT, ()=> 
console.log("Server started on the PORT", PORT))