import express from "express";
import { genPassword, createUser, getUserByName } from "../helper/helperUser.js";


const router = express.Router();




// signUp/register
router.post('/signup',async(req,res)=>{
    const {username,password} = req.body;
    console.log(username,password)
     // validate if username is present
       const isUserExist = await getUserByName(username);
         console.log(isUserExist);
           if(isUserExist){
               res.status(400).send({message: "username already exists"})
               return;
           }
            // validate if password matches
           if(!/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[_#!@%&$*]).{8,}$/g.test(password
            )){
                res.status(400).send({message: "Password pattern does not match"});
                return;
           }
    const hashedPassword = await genPassword(password);
    const result = createUser(username,hashedPassword);
    res.send(result); 
 });

 

// login
router.post('/login',async(req,res)=>{
  const {username,password} = req.body;
  console.log(username,password)
   // validate if username is present
     const userDataDB = await getUserByName(username);
       console.log(userDataDB);

       if(!userDataDB){
        res.status(400).send({message: " Invalid Credentials "})
        return;
    }
  res.send(userDataDB); 
});



 export const usersRouter = router;