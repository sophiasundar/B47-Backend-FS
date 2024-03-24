import express from "express";
import { newWn, getWon, getWnById, deleteWnById, putWn, getWonCloth } from '../helper/helperWomen.js';
const router = express.Router();

router.post('/',async (req,res)=>{
    const newCloth = req.body;
    console.log(newCloth);
    const result = await newWn(newCloth);
    res.send(result);
})

router.get('/', async(req,res)=>{
     const clothWm = await getWon();
     res.send(clothWm);
})

router.get('/filter', async(req,res)=>{
  let {price,brand} = req.query;
  price = Number(price)
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
        const clothWm = await getWonCloth(query);
        if(!clothWm){
            return res.status(404).send("Clothing for Women not found !")
           }
        res.send(clothWm);
      }catch (error){
        console.error("Error fetching Clothing:", error);
      }
    
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    const getClothId = await getWnById(id);
    res.send(getClothId)
})

router.delete('/:id', async(req,res)=>{
    const { id } = req.params;
    const delCloth = await deleteWnById(id);
    res.send(delCloth);
})

router.put('/:id', async(req,res)=>{
    const { id } = req.params;
    const updateCloth = req.body;
    const result = await putWn(id, updateCloth);
    res.send(result);
})

export const womenRouter = router;