import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import cors from "cors";
import { userRouter } from "./routes/routeUser.js";
import { foodRouter } from "./routes/routeFood.js";
import { OrphManagerRouter } from "./routes/routeOrphanInfo.js";
import { emailRouter } from "./routes/routeEmail.js";
import nodemailer from 'nodemailer';



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


  async function sendEmail(name, orphanagename, email, address, banquetname, banmanagername, banquetemails){
    
      const client = new MongoClient(MONGO_URL);
      await client.connect();
   
      
         const transporter = nodemailer.createTransport({
            service:"gmail",
             auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
             }
            });
      
      
         const mailOptions = {
         from: `${email}`,
         to: `${banquetemails}`,
         subject: 'Orphanage Booking Confirmation',
         html: `<h1>Food Takein Confirmation by Orphanage Management</h1>

         <p>Dear ${banmanagername}, </p>
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
          <li>Name: ${banmanagername} </li>
          <li>Banquet Hall: ${banquetname}</li>
          <li>Banquet Manager Email: ${banquetemails}</li>
         </ul>
         <p><b>Thanks and Regards, </b></p>
               <p>${name}<p/>
            <p>${orphanagename}</p>

         `
      };

      const info = transporter.sendMail(mailOptions, function(error){
         if(error){
            console.log(error)
           
         }else{
            console.log("Email sent successfully. Message ID:", info.messageId)
           
         }
      });

      console.log("Message sent: %s", info.messageId)

};

   // nodemail

      app.get('/',(req,res)=>{
         res.send('Hey! Hi, 🙋‍♀️👋🙌🏽🙏🏽');
      });

     // email
       app.post('/sendemail', async(req,res)=>{

        try{     
         const { name, orphanagename, email, address, banquetname, banmanagername, banquetemails } = req.body.newEmail;
         console.log(name, orphanagename, email, address, banquetname, banmanagername, banquetemails);
         await sendEmail( name, orphanagename, email, address, banquetname, banmanagername, banquetemails);
         res.json({ message: 'Email sent successfully! '});
      }catch (error){
          console.log(error);
          res.status(500).json({ message: "Error sending email" })
      }
      
         
       });
     
       //user
     app.use("/users", userRouter);

     //foodlist
     app.use('/crud', foodRouter);

     //Orph Info
     app.use('/orphinfo',OrphManagerRouter);
     
   //   email banquet
     app.use('/banquet', emailRouter)

 app.listen(PORT, ()=> 
    console.log("Server started on the PORT", PORT)
    )