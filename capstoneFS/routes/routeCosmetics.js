import express from "express";
import { newCosmetics, getCos, getById, deleteById, putCosMen, getCosMen } from '../helper/helperCosmetics.js';
const router = express.Router();

router.post('/',async (req,res)=>{
    const newCos = req.body;
    console.log(newCos);
    const result = await newCosmetics(newCos);
    res.send(result);
})

router.get('/', async(req,res)=>{
     const allCos = await getCos();
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
      const allCos = await getCosMen(query);
         if(!allCos){
            return res.status(404).send("Cosmetics for Men not found !")
         }
        res.send(allCos);
     }catch (error){
        console.error("Error fetching laptop:", error);
      }
    
});

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    const getCosId = await getById(id);
    res.send(getCosId)
})

router.delete('/:id', async(req,res)=>{
    const { id } = req.params;
    const delCos = await deleteById(id);
    res.send(delCos);
})

router.put('/:id', async(req,res)=>{
    const { id } = req.params;
    const updateCosMen = req.body;
    const result = await putCosMen(id, updateCosMen);
    res.send(result);
})

export const cosMenRouter = router;