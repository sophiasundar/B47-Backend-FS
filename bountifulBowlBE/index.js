import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import cors from "cors";
import { userRouter } from "./routes/routeUser.js";
import { foodRouter } from "./routes/routeFood.js";
import { OrphManagerRouter } from "./routes/routeOrphanInfo.js";
import { emailRouter } from "./routes/routeEmail.js";
import nodemailer from 'nodemailer';
import { ObjectId } from "mongodb";
import fs from 'fs';

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


 const dbName = 'bountiful';
export async function sendEmail(banquetDetailsId, orphanageManagerId){
  const client = new MongoClient(MONGO_URL);
  
  try{
           await client.connect();
           const db = client.db(dbName);
          //  console.log(dbName);
        

        const banDetailsCollect = db.collection('food');
        const orphInfoCollect = db.collection('orphanageInfo')
        
          
        const banquetDetails = await banDetailsCollect.findOne({ _id: new ObjectId(banquetDetailsId)})
        console.log(typeof(banquetDetailsId))
        console.log(banquetDetailsId)
          if (!banquetDetails){
            throw new Error('Banquet details not found');
          }

          const orphanageInfo = await orphInfoCollect.findOne({ _id: new ObjectId(orphanageManagerId)})
          console.log(typeof(orphanageManagerId))
          console.log(orphanageManagerId)
          if (!orphanageInfo){
            throw new Error('Orphanage Information not found');
          }
             
        await sendEmail(banquetDetails, orphanageInfo);

        // email service
        const transporter = nodemailer.createTransport({
           host: 'smtp.gmail.com',
           port: 587,
           secure: false,
           auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
           }
          });

          const mailOptions = {
             from: orphanageInfo.email,
             to: banquetDetails.email,
             subject: 'Orphanage Booking Confirmation',
             html: fs.readFileSync('mail.html', 'utf8'),
          };

          await transporter.sendMail(mailOptions);
          console.log('Email sent successfully!')
    }catch (error){
      console.error('Error fetching data or sending email:',error);
    }finally{
        await client.close();
    }


  };

   // nodemail

      app.get('/',(req,res)=>{
         res.send('Hey! Hi, 🙋‍♀️👋🙌🏽🙏🏽');
      });

     //user
     app.use("/users", userRouter);

     //foodlist
     app.use('/crud', foodRouter);

     //Orph Info
     app.use('/orphinfo',OrphManagerRouter);
     
     //email
     app.use('/agree',emailRouter);  


 app.listen(PORT, ()=> 
    console.log("Server started on the PORT", PORT)
    )