import { verifyToken } from "../middleware/auth.js";  
import express from "express";
import { addOrphManager, getOrphManagers, getOrphId } from '../helper/helperOrphanInfo.js';

const router = express.Router();


    // create 
    router.post("/", verifyToken(['orphanage-manager']), async (req,res)=>{
        const newInfo = req.body;
        console.log(newInfo);
        const result = await addOrphManager(newInfo);
       res.send(result); 
    });

      // read
      router.get("/",  async (req,res)=>{
        const allInfo = await getOrphManagers();
        res.send(allInfo);
  });

      router.get("/:id", async (req,res)=>{
        const {id} = req.params;
        const orph = await getOrphId(id);
        res.send(orph);
    });




export const OrphManagerRouter = router;