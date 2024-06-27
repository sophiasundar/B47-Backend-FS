
import express from "express";
import { getBanquetEmail } from '../helper/helperEmail.js';


const router = express.Router();

router.get("/", async (req,res)=>{
   
   try{
      const emails = await getBanquetEmail();
      res.json(emails); 
   }catch{
      console.error('Error retrieving emails:', error);
    res.status(500).json({ message: 'Error retrieving emails' });
   }
});
   
export const emailRouter = router;
      

      