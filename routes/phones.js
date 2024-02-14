import express from "express";
import { getPhones, getPhoneId, deletePhones, addPhones, putPhones } from "../helper/helperPhone.js"
import { auth } from "../middleware/auth.js";
const router = express.Router();



//  for getting all phone's data  
router.get('/', auth ,async(req,res)=>{
    const phones = await getPhones()
   res.send(phones)
});

//  for getting phone's data by id
router.get('/:id', auth, async(req,res)=>{
   const {id} = req.params;
    const phones = await getPhoneId(id)
   res.send(phones);
});

//  for deleting phone's data by id
router.delete('/:id',async(req,res)=>{
   const {id} = req.params;
   const phones = await deletePhones(id);
  res.send(phones);
});

//  for adding phones 
//  in postman give array and single obj
router.post('/',async(req,res)=>{
   const newPhone = req.body;
   const result = await addPhones(newPhone);
  res.send(result); 
}); 

//  for editing phones data
   // put= post and get 
   //  in postman only single obj not within array
router.put("/:id", async (req,res)=>{
   const { id } = req.params;
   const updatePhones = req.body;
   console.log(updatePhones);
   const output = await putPhones(id, updatePhones);
   res.send(output); 
});
  



   export const phonesRouter = router;


