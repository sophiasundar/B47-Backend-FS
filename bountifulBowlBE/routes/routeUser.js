import express from "express";
import { genPassword, createUser, getUserEmail } from '../helper/helperUser.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { verifyToken } from "../middleware/auth.js";
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
            res.status(400).send({message: "Invalid Credentials"})
            return;
          }

          const passwordDb = userFromDB.password;
            const isPasswordMatch = await bcrypt.compare(password,passwordDb)

            if(!isPasswordMatch){
                res.status(400).send({message:"Invalid Credentials"})
                return;
            }

            // generate token
              const token = jwt.sign({id:userFromDB._id, role: userFromDB.role}, process.env.SECRET_KEY, {
                // expriesIn:"1hr"
              });
                res.send({ message: "Succefully Logged In", user:userFromDB,  token:token, roleId: userFromDB.roleId  });
    });

    //  to authorize the user so we have to verify the token

    async function authorize(allowedRoles) {
      return async (req, res, next) => {
        const user = req.user; // Assuming user information is in the request
    
        if (!user || !allowedRoles.includes(user.role)) {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
        } 
         
        next(); // Authorized, proceed to the route handler
      };
    }
       
    // create read delete update by cater manager
  //  router.get("/userauthor", verifyToken, authorize(['banquet-manager']), async (req,res)=>{
      
     
  //   });

  //   router.get("/foodlist", verifyToken, authorize(['banquet-manager','orphanage-manager']), async (req,res)=>{
      
     
  //   });

    
 
    
   
       

    export const userRouter = router;