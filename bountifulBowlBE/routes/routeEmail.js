import { sendEmail } from '../index.js';
import express from 'express';
// import { verifyToken } from "../middleware/auth.js";  
const router = express.Router();



    
   // verifyToken(['orphanage-manager']),
router.post("/",  async (req,res)=>{

   const { name, orphanagename, email, address, banquetDetailsId } = req.body;

   try{
      await sendEmail( name, orphanagename, email, address, banquetDetailsId );
      res.json({ message: 'Email sent successfully! '});
   }catch (error){
       console.log(error);
       res.status(500).json({ message: "Error sending email" })
   }
   
});




export const emailRouter = router;