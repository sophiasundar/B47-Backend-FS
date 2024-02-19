import express from "express";
import { genPassword, createUser, getUserByEmail } from "../helper/helperUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();




// signUp/register
router.post('/signup',async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)
     // validate if email is present
       const isUserExist = await getUserByEmail(email);
         console.log(isUserExist);
           if(isUserExist){
               res.status(400).send({message: "email already exists"})
               return;
           }
            // validate if password matches
          //  if(!/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[_#!@%&$*]).{8,}$/g.test(password
          //   )){
          //       res.status(400).send({message: "Password pattern does not match"});
          //       return;
          //  }

          
    const hashedPassword = await genPassword(password);
    const result = await createUser(email,hashedPassword);
    res.status(200).send(result); 
 });

 

// login
router.post('/login',async(req,res)=>{
  const {email,password} = req.body;
  console.log(email,password)
   // validate if email is present
     const userFromDB = await getUserByEmail(email);
       console.log(userFromDB);

       if(!userFromDB){
        res.status(400).send({message: " Invalid Credentials "})
        return;
    }

 
    const passwordDb = userFromDB.password;
      const isPasswordMatch = await bcrypt.compare(password,passwordDb)
      
      if(!isPasswordMatch){
        res.status(400).send({message: " Invalid Credentials "})
        return;
    }

    // generate token
         const token = jwt.sign({id:userFromDB._id},process.env.SECRET_KEY);
           res.send({ message: "Succefully Logged In ", token:token, roleId: userFromDB.roleId }); 
});



 export const usersRouter = router;