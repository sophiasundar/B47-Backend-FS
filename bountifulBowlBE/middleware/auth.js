import jwt from "jsonwebtoken";


export const verifyToken = (allowedRoles) =>{
      return(req,res,next)=>{
    const headers = req.headers.authorization;
    console.log(headers);
     
    if(!headers || !headers.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Unauthorized: Missing or malformed access token' })
    }

    const token = headers.split(' ')[1];

    if(!token){
        res.status(404).json({Message:"No Token Found"})
    }

    try{
       const decodedUser =  jwt.verify(token, process.env.SECRET_KEY);
       req.user = decodedUser;
       
       if(!allowedRoles.includes(decodedUser.role)){
        return res.status(403).json({ Message: 'Forbidden: User not authorized for this operation'});
    }
    next();
    }catch(err){
        console.error('Error verifying token:', err);
        return res.status(400).json({ Message: 'Invalid Token' });
  
    } 
     };

    };
 



