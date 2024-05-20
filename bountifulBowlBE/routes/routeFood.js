import { verifyToken } from "../middleware/auth.js";  
import express from "express";
import { addFoodList, getFoods, getFoodId, deleteById, putFood } from '../helper/helperFood.js';

const router = express.Router();

    // create read delete update by cater manager

    // create 
    router.post("/foodlist", verifyToken(['banquet-manager']), async (req,res)=>{
        const newfoodList = req.body;
        console.log(newfoodList);
        const result = await addFoodList(newfoodList);
       res.send(result); 
     
    });


     // read all food
    router.get("/foodlist", async (req,res)=>{
          const fullfood = await getFoods();
          res.send(fullfood);
    });


    // read food by ID
    router.get("/foodlist/:id", verifyToken(['banquet-manager','orphanage-manager']), async (req,res)=>{
      const {id} = req.params;
      const food = await getFoodId(id);
      res.send(food);
});

     // edit
     router.put("/foodlist/:id", verifyToken(['banquet-manager']), async (req,res)=>{
          const {id} = req.params;
          const updateFood = req.body;
          console.log(updateFood);
          const result = await putFood(id, updateFood);
          res.send(result);
     
     });

    // delete
      router.delete("/foodlist/:id", verifyToken(['banquet-manager']), async (req,res)=>{
          const {id} = req.params;
          const delFood = await deleteById(id);
          res.send(delFood);
        });

    



  export const foodRouter = router;