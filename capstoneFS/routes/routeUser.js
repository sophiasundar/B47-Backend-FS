import express from "express";
import { getUserEmail, genPassword, createUser, findById } from '../helper/helperUser.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();


// signUp/register
router.post('/signup',async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)
     // validate if email is present
       const isUserExist = await getUserEmail(email);
         console.log(isUserExist);
           if(isUserExist){
               res.status(400).send({message: "email already exists"})
               return;
           }
  
    const hashedPassword = await genPassword(password);
    const result = await createUser(email,hashedPassword);
    res.status(200).send(result); 
 });

 // login
router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)
     // validate if email is present
       const userFromDB = await getUserEmail(email);
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

  //  for middleware jwt verification

  const verifyToken = (req, res, next)=>{
    
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith('Bearer ') ){
          return res.status(401).json({ message: 'Unauthorized access' });
        }

        const token = authHeader.split(' ')[1];
       
        try{
          
          const decoded = jwt.verify(token, process.env.SECRET_KEY);
          req.userId = decoded.id; // Attach user data to request object
          next();
        
        }catch (err){
      res.status(401).json({ message: 'Invalid token'});
    }
  }

   // wishlist - get

  router.get('/wishlist', verifyToken, async (req,res)=>{
        const userId = req.userId; // Get user ID from verified token
        console.log(req.userId)
        try{
          const user = await findById(userId);
           if(!user){
            return res.status(404).json({ message: 'User not found' });
           }
           res.status(200).send(user); 
        }catch (err){
          console.error(err);
          res.status(500).json({ message: 'Server error' });
        }
  })
 
  // // wishlist - post

  // router.post('/addwishlist',verifyToken, async(req,res)=>{
  //   try{
  //     const userId = req.userId;
  //     const { productId } = req.body;
      
  //       if(!productId){
  //         return res.status(400).json({ message: 'Missing product ID' });
  //       }
  //       const user = await addProductToWishlist(userId, newProduct);
  //       if(!user){
  //         return res.status(404).json({ message: 'User not found' });
  //        }

  //       }catch(err){
  //         console.error(err);
  //         res.status(500).json({ message: 'Server error' });
  //       }

  // })



export const usersRouter = router;