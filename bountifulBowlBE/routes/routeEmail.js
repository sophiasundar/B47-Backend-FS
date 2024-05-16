import { sendEmail } from '../index.js';
import express from 'express';
import { verifyToken } from "../middleware/auth.js";  
const router = express.Router();

//agree logic     
router.post("/", verifyToken(['orphanage-manager']), async (req,res)=>{
   try{
      const { banquetDetailsId, orphanageManagerId } = req.body;
      await sendEmail(banquetDetailsId, orphanageManagerId );
      res.json({ message: 'Email sent successfully! '});
   }catch (error){
       console.log(error);
       res.status(500).json({ message: "Error sending email" })
   }
   
     
});


export const emailRouter = router;