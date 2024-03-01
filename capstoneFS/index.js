import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import { laptopsRouter } from './routes/routeLaptop.js';
import cors from "cors";


const app = express();
const PORT = 8000;

app.use(cors());
dotenv.config();
app.use(express.json());

const MONGO_URL = process.env.mongo_url;

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


app.use('/laptops', laptopsRouter);



app.listen(PORT, ()=> 
console.log("Server started on the PORT", PORT)
)