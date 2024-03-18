import express from "express";
import { addLaptop, getLaptop, getLaptopId, deleteLapId, putLaps, getlaps } from "../helper/helperLaptop.js"
const router = express.Router();

//  for adding laps 
//  in postman give array and single obj
router.post('/',async(req,res)=>{
    const newLaptop = req.body;
    console.log(newLaptop);
    const result = await addLaptop(newLaptop);
   res.send(result); 
 });

 router.get('/', async(req,res)=>{
  const alllaps = await getlaps();
  res.send(alllaps);
})

//  for getting all lap's data 
router.get('/filter' ,async(req,res)=>{
  const {price,brand} = req.query;
  console.log(req.query,price);

  const query = {};
     if (price && typeof price === 'number'){
      query.price = { $gte: price};
    }else if (price) {
      console.warn("Invalid price format. Expected a number.");
    }
     
    if(brand){
      query.brand = brand;
    }

  try{
    const laptop = await getLaptop(query);
       if(!laptop){
        return res.status(404).send("Laptop Not Found !")
       }
       res.send(laptop)
  }catch (error){
    console.error("Error fetching laptop:", error);
  }
   
   
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