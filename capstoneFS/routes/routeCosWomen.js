import express from "express";
import { newCosw, getCosW, getByIdWomen, deleteByIdWo, putCosWomen, getCosWomen } from '../helper/helperCosWomen.js';
const router = express.Router();

router.post('/',async (req,res)=>{
    const newCos = req.body;
    console.log(newCos);
    const result = await newCosw(newCos);
    res.send(result);
})

router.get('/', async(req,res)=>{
     const allCos = await getCosW();
     res.send(allCos);
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
        const allCosWn = await getCosWomen(query);
         if(!allCosWn){
            return res.status(404).send("Cosmetics for Women not found !")
           }
         res.send(allCosWn);
      }catch (error){
        console.error("Error fetching Cosmetics:", error);
      }
    
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    const getCosId = await getByIdWomen(id);
    res.send(getCosId)
})

router.delete('/:id', async(req,res)=>{
    const { id } = req.params;
    const delCos = await deleteByIdWo(id);
    res.send(delCos);
})

router.put('/:id', async(req,res)=>{
    const { id } = req.params;
    const updateCosWomen = req.body;
    const result = await putCosWomen(id, updateCosWomen);
    res.send(result);
})

export const cosWomenRouter = router;