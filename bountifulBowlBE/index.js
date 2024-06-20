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
export async function sendEmail(name, orphanagename, email, address, banquetDetailsId){
  const client = new MongoClient(MONGO_URL);
  
  try{
           await client.connect();
           const db = client.db(dbName);
           console.log(dbName);
        

        const banDetailsCollect = db.collection('food');
      //   const orphInfoCollect = db.collection('orphanageInfo')
        
          
        const banquetDetails = await banDetailsCollect.findOne({ _id: new ObjectId(banquetDetailsId)})
        console.log(typeof(banquetDetailsId))
        console.log(banquetDetailsId)
          if (!banquetDetails){
            throw new Error('Banquet details not found');
          }

         //  const orphanageInfo = await orphInfoCollect.findOne({ _id: new ObjectId(orphanageManagerId)})
         //  console.log(typeof(orphanageManagerId))
         //  console.log(orphanageManagerId)
         //  if (!orphanageInfo){
         //    throw new Error('Orphanage Information not found');
         //  }
             
       

        // email service
        const transporter = nodemailer.createTransport({
          service:"gmail",
           auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
           }
          });

          const mailOptions = {
             from: `${email}`,
             to: banquetDetails.email,
             subject: 'Orphanage Booking Confirmation',
             html: `<h1>Food Takein Confirmation by Orphanage Management</h1>

             <p>Dear ${banquetDetails.name}, </p>
             <p>This email confirms that ${name} orphanage has agreed to Takein the food.</p>
      
             <p><b>Orphanage Details: </b></p>
             
             <ul>
              <li>Name: ${name}</li>
              <li>Orphanage Name: ${orphanagename}</li>
              <li>Address: ${address}</li>
              <li>email: ${email} </li>
             </ul>
      
             <p><b>Banquet Details:</b></p>
             <ul>
              <li>Name: ${banquetDetails.name} </li>
              <li>Banquet Hall: ${banquetDetails.hallname}</li>
              <li>Address: ${banquetDetails.address} </li>
              <li>Food TakeIn Date: ${banquetDetails.date} </li>
              <li>Food TakeIn Time: ${banquetDetails.time}</li>
             </ul>
             <p><b>Thanks and Regards, </b></p>
                   <p>${name}<p/>
                <p>${orphanagename}</p>

             `
          }

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
     app.use('/sendemail',emailRouter);  


 app.listen(PORT, ()=> 
    console.log("Server started on the PORT", PORT)
    )