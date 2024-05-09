import jwt from "jsonwebtoken";


export const verifyToken = (req,res,next)=>{
    const headers = req.headers[`authorization`]
    console.log(headers);
    const token = headers.split(' ')[1];

    if(!token){
        res.status(404).json({message:"No Token Found"})
    }
     jwt.verify(String(token), process.env.SECRET_KEY, (err,user)=>{
           if(err){
            return res.status(400).json({message: "Invalid Token"})
           }
           console.log(user.id);
           req.id =  user.id;
     });

     next();
 };


// export const auth =(req,res,next) =>{
//     try{
//         const token = req.header("x-auth-token");
//         console.log(token);
//         jwt.verify(token,process.env.SECRET_KEY);
//         next();
// }catch(err){
//     res.send({ error: err.message })
// }
// };
