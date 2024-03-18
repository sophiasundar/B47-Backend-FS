import express from "express";
import { newMn, getMn, getMnById, deleteMnById, putMn, getMnCloth }  from '../helper/helperMen.js'
const router = express.Router();

router.post('/',async (req,res)=>{
    const newCloth = req.body;
    console.log(newCloth);
    const result = await newMn(newCloth);
    res.send(result);
})

router.get('/', async(req,res)=>{
     const allCloth = await getMn();
     res.send(allCloth);
})

router.get('/filter', async(req,res)=>{
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
        const allCloth = await getMnCloth(query);
          if(!allCloth){
            return res.status(404).send("Clothing for Men not found !")
           }
        res.send(allCloth);
      }catch (error){
        console.error("Error fetching Clothing:", error);
      }
    
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    const getClothId = await getMnById(id);
    res.send(getClothId)
})

router.delete('/:id', async(req,res)=>{
    const { id } = req.params;
    const delCloth = await deleteMnById(id);
    res.send(delCloth);
})

router.put('/:id', async(req,res)=>{
    const { id } = req.params;
    const updateCloth = req.body;
    const result = await putMn(id, updateCloth);
    res.send(result);
})

export const menRouter = router;