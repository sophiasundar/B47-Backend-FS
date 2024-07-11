import express from "express";
import { genPassword, createUser, getUserEmail } from '../helper/helperUser.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();


// signup/ register
    router.post('/signup', async(req,res)=>{
        const {name,email,password,role} = req.body;
        console.log(name,email,password)
        // validate if email is present 
        const isUserExist = await getUserEmail(email);
           console.log(isUserExist);
           if(isUserExist){
               res.status(400).send({message: "email already exists"})
               return;
           }

           const hashedPassword = await genPassword(password);
            const result = await createUser(name,email,hashedPassword,role);
            res.status(200).send(result); 
    });

    // login

    router.post('/login', async(req,res)=>{
        const {email, password} = req.body;
        console.log(email,password);

        // validate if email is present 
          const userFromDB = await getUserEmail(email);
          console.log(userFromDB);

          if(!userFromDB){
            res.status(401).send({message: "Invalid Credentials"})
            return;
          }

          const passwordDb = userFromDB.password;
            const isPasswordMatch = await bcrypt.compare(password,passwordDb)

            if(!isPasswordMatch){
                res.status(401).send({message:"Invalid Credentials"})
                return;
            }

            // generate token
              const token = jwt.sign({id:userFromDB._id, role: userFromDB.role}, process.env.SECRET_KEY, {
                // expriesIn:"1hr"
              });
                res.send({ message: "Successfully Logged In", user:userFromDB,  token:token, roleId: userFromDB.roleId, role: userFromDB.role  });
    });

    
       
  


   

    
 
    
   
       

    export const userRouter = router;