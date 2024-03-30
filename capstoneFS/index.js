import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import { laptopsRouter } from './routes/routeLaptop.js';
import { phonesRouter } from './routes/routePhones.js';
import { cosMenRouter } from './routes/routeCosmetics.js';
import { cosWomenRouter } from './routes/routeCosWomen.js';
import { menRouter } from './routes/routeMen.js';
import { womenRouter } from './routes/routeWomen.js';
import { usersRouter } from './routes/routeUser.js';
import cors from "cors";


const app = express();
const PORT = 8000;

app.use(cors());
dotenv.config();
app.use(express.json());

const mongo_url = process.env.mongo_url;

 async function createConnection(){
    const client = new MongoClient(mongo_url);
    await client.connect();  
    console.log("Mongodb is Connected");
    return client; 
 }

export const client = await createConnection()

   // search  
   const dbName = 'item_catalog';

  async function searchCollection(query){
   const client = new MongoClient(MONGO_URL);
   const results = [];
  try{ 
   await client.connect();
   const db =  client.db(dbName);
   console.log(dbName);
   

   const collections = ['phones','laptop','cosmen','cosWomen','clothWomen','clothMn'];
  
     for (const collectionName of collections){
          const collection = db.collection(collectionName);
          const searchResult = await collection.find({ $text: { $search: query} }).toArray();
           results.push(...searchResult);
     }
   return results;
  }
     catch(error){
   throw error;
  } finally {
     await client.close();
  }
}

 
app.get('/',(req,res)=>{
    res.send('Hey! Hi, 🙋‍♀️👋🙌🏽🙏🏽');
});

app.get('/search',async (req,res)=>{
        const query = req.query.q;

        try{

         if (!query) {
            return res.status(400).json({ error: 'Missing search query parameter.' });
        }
          const results = await searchCollection(query);
           res.json(results);
        }catch(error){
           console.error('Error searching collections:', error);
           res.status(500).json({error:'Internal server error'});
        }
});

// electronics
app.use('/laptops', laptopsRouter);
app.use('/phones', phonesRouter);

// cosmetics
app.use('/cosmen', cosMenRouter);
app.use('/coswomen', cosWomenRouter);

// clothing
app.use('/clothingmen', menRouter);
app.use('/clothingwomen', womenRouter);

app.use("/users", usersRouter);

app.listen(PORT, ()=> 
console.log("Server started on the PORT", PORT)
)