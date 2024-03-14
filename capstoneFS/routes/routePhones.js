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
    const {name,price,brand} = req.query;
//   console.log(req.query,name);
  const query = {};
  if (name){
         query.name = name;
     } 
     if (price){
      query.price = price;
    } 
    if(brand){
        query.brand = brand;
    }
    // else{
    //    return  res.status(400).send("Brand Paramater is required")
    //   }

      try{
        const phonesQuery = req.query;
        const phones = await getPhones(phonesQuery)
        if(!phones.length){
            return  res.status(404).send("Phones not found") 
        }
        res.send(phones)
      }catch{
        console.error("Error fetching phone:", "error")
        return res.status(500).send("Internal server error.")
      }
    
        
 })

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