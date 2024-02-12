import express from "express";

const router = express.Router();




// add user
router.post('/',async(req,res)=>{
    const newPhone = req.body;
    const result = await addPhones(newPhone);
   res.send(result); 
 });



 export const usersRouter = router;