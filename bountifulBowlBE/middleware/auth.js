import jwt from "jsonwebtoken";


export const verifyToken = (allowedRoles) =>{
      return (req,res,next)=>{
    const headers = req.headers[`authorization`]
    console.log(headers);
     
    if(!headers || !headers.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Unauthorized: Missing or malformed access token' })
    }

    const token = headers.split(' ')[1];

    if(!token){
        res.status(404).json({message:"No Token Found"})
    }
     jwt.verify(token, process.env.SECRET_KEY, (err,user)=>{
           if(err){
            return res.status(400).json({message: "Invalid Token"})
           }

        // Role-based authorization check
          if(!allowedRoles.includes(user.role)){
              return res.status(403).json({ message: 'Forbidden: User not authorized for this operation'});
          }
        
           req.user = user;
        
           next();
     });

    };
 };



