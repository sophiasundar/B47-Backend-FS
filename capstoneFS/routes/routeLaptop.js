import express from "express";
import { addLaptop, getLaptop, getLaptopId, deleteLapId, putLaps } from "../helper/helperLaptop.js"
const router = express.Router();

//  for adding laps 
//  in postman give array and single obj
router.post('/',async(req,res)=>{
    const newLaptop = req.body;
    console.log(newLaptop);
    const result = await addLaptop(newLaptop);
   res.send(result); 
 });



//  for getting all lap's data 
router.get('/' ,async(req,res)=>{
    const laptop = await getLaptop()
   res.send(laptop)
});
  
//  for getting all lap's data by id
router.get('/:id',async(req,res)=>{
     const {id} = req.params;
     const laptop = await getLaptopId(id)
   res.send(laptop);
})

//  for deleting all lap's data by id
router.delete('/:id',async(req,res)=>{
      const {id} = req.params;
      const laptop = await deleteLapId(id);
      res.send(laptop);
})

// for updating the laptop's exisiting data
router.put('/:id', async(req,res)=>{
  const { id } = req.params;
  const updateLaptops = req.body;
  console.log(updateLaptops);
  const output = await putLaps(id, updateLaptops);
  res.send(output);
});


export const laptopsRouter = router;