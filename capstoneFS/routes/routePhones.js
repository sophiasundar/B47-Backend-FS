import express from "express";
import { addPhones, getPhones, getPhonesId, deleteById, putPhones } from '../helper/helperPhones.js'
const router = express.Router();

router.post('/',async(req,res)=>{
    const newPhones = req.body;
    console.log(newPhones);
    const result = await addPhones(newPhones);
   res.send(result); 
 });

 router.get('/',async(req,res)=>{
    const phones = await getPhones()
        res.send(phones)
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