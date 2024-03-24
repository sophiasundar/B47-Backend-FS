import express from "express";
import { addPhones, getPhones, getPhonesId, deleteById, putPhones, getphns } from '../helper/helperPhones.js'
const router = express.Router();

router.post('/',async(req,res)=>{
    const newPhones = req.body;
    console.log(newPhones);
    const result = await addPhones(newPhones);
   res.send(result); 
 });

 router.get('/', async(req,res)=>{
  const allphones = await getphns();
  res.send(allphones);
})



 router.get('/filter',async(req,res)=>{
  let {minPrice,maxPrice,brand} = req.query;
  minPrice = Number(minPrice);
  maxPrice = Number(maxPrice)
  console.log(minPrice,maxPrice);

  const query = {}; 
     if (minPrice && maxPrice){
        query.price = { $lte: maxPrice , $gte: minPrice };
    } else if (price) {
      console.warn("Invalid price format. Expected a number.");
    }  
    
     if(brand){
        query.brand = brand;
    }
    
    try{
        const phones = await getPhones(query);
        if(!phones){
          return res.status(404).send("Phones Not Found !")
         }
        res.send(phones)
      }catch{
        console.error("Error fetching phone:", "error")
        return res.status(500).send("Internal server error.")
      }
    
});

 router.get('/:id',async(req,res)=>{
     const {id} = req.params;
     const phone = await getPhonesId(id);
     res.send(phone);
 })

 router.delete('/:id', async (req,res)=>{
      const {id} = req.params;
      const delPhones = await deleteById(id);
      res.send(delPhones);
 })

 router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const updatePhones = req.body;
    console.log(updatePhones);
    const result = await putPhones(id, updatePhones);
    res.send(result);

 })

 export const phonesRouter = router;