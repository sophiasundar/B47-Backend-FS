import { verifyToken } from "../middleware/auth.js";  
import express from "express";
import { addFoodList, getFoods, getFoodId, deleteById, putFood } from '../helper/helperFood.js'
const router = express.Router();

    // create read delete update by cater manager

    // create 
    router.post("/foodlist", verifyToken(['banquet-manager']), async (req,res)=>{
        const newfoodList = req.body;
        console.log(newfoodList);
        const result = await addFoodList(newfoodList);
       res.send(result); 
     
    });


     // read
    router.get("/foodlist", verifyToken(['banquet-manager','orphanage-manager']), async (req,res)=>{
          const fullfood = await getFoods();
          res.send(fullfood);
    });


    //  // edit
    //  router.put("/foodlist", verifyToken(['banquet-manager']), async (req,res)=>{
          
     
    //  });

    //   // delete
    // router.delete("/foodlist", verifyToken(['banquet-manager']), async (req,res)=>{
          
     
    // });

   
  //  router.get("/agree", verifyToken(['orphanage-manager']), async (req,res)=>{
            
     
  //   });


  export const foodRouter = router;