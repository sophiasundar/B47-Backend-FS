import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import { phonesRouter } from "./routes/phones.js";
import cors from "cors";
// import bodyParser from "body-parser";

dotenv.config();
const app = express()
const PORT = 8000;

app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }))



//Mongo Connection
  const MONGO_URL = process.env.mongo_url;

 async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();  
    console.log("Mongodb is Connected");
    return client; 
 }

 export const client = await createConnection()

 app.use(express.json());
//  app.use(bodyParser.json());

//   for starting the port
app.get('/',(req,res)=>{
    res.send('Hello World, 🙋‍♀️🌏👋');
});

app.use("/phones", phonesRouter);


app.listen(PORT, ()=> 
console.log("Server started on the PORT", PORT))

