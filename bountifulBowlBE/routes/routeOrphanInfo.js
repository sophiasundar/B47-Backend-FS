import { verifyToken } from "../middleware/auth.js";  
import express from "express";
import { addOrphManager, getOrphManagers } from '../helper/helperOrphanInfo.js';

const router = express.Router();


    // create 
    router.post("/", verifyToken(['orphanage-manager']), async (req,res)=>{
        const newInfo = req.body;
        console.log(newInfo);
        const result = await addOrphManager(newInfo);
       res.send(result); 
    });

      // read
      router.get("/", async (req,res)=>{
        const allInfo = await getOrphManagers();
        res.send(allInfo);
  });




export const OrphManagerRouter = router;