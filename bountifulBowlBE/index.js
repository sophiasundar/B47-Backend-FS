import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import cors from "cors";
import { userRouter } from "./routes/routeUser.js";
import { foodRouter } from "./routes/routeFood.js";

const app = express();
const PORT = 8000;

app.use(cors());
dotenv.config();
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

 async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();  
    console.log("Mongodb is Connected");
    return client; 
 }

 export const client = await createConnection()

      app.get('/',(req,res)=>{
         res.send('Hey! Hi, 🙋‍♀️👋🙌🏽🙏🏽');
      });

     //user
     app.use("/users", userRouter);

     //foodlist
     app.use('/crud', foodRouter);
     

 app.listen(PORT, ()=> 
    console.log("Server started on the PORT", PORT)
    )