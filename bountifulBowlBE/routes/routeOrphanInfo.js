import { verifyRoles } from "../middleware/auth.js";  
import express from "express";
import { addOrphManager, getOrphManagers, getOrphId, putOrph, deleteById  } from '../helper/helperOrphanInfo.js';
import { ROLES } from "../roles.js";

const router = express.Router();


    // create 
    router.post("/", verifyRoles([ROLES.ORPHANAGE_MANAGER]), async (req,res)=>{
        const newInfo = req.body;
        console.log(newInfo);
        const result = await addOrphManager(newInfo);
       res.send(result); 
    });

      // read
      router.get("/", verifyRoles([ROLES.ORPHANAGE_MANAGER,ROLES.BANQUET_MANAGER]), async (req,res)=>{
        const allInfo = await getOrphManagers();
        res.send(allInfo);
  });

      router.get("/:id", verifyRoles([ROLES.ORPHANAGE_MANAGER,ROLES.BANQUET_MANAGER]), async (req,res)=>{
        const {id} = req.params;
        const orph = await getOrphId(id);
        res.send(orph);
    });


          // edit  
     router.put("/:id", verifyRoles([ROLES.ORPHANAGE_MANAGER]), async (req,res)=>{
      const {id} = req.params;
      const updateOrph = req.body;
      console.log(updateOrph);
      const result = await putOrph(id, updateOrph);
      res.send(result);
 
     });

          // delete 
      router.delete("/:id",  verifyRoles([ROLES.ORPHANAGE_MANAGER]), async (req,res)=>{
        const {id} = req.params;
        const delOrph = await deleteById(id);
        res.send(delOrph);
      });



export const OrphManagerRouter = router;