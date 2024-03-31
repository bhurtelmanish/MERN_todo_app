import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenValidity = (req , res , next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.json({status: 400 , msg: "Access denied. No Tokens provided."});
    }
    
    try {
        const tokenVerify = jwt.verify(token , process.env.PASSWORD);
        if(tokenVerify){
            const tokenValidity = tokenVerify.exp <= Date.now() / 1000;
            if(!tokenValidity){
                return res.json({status: 200, msg:"Page request granted."});
            }
            req.user = tokenVerify; 
        }
        next();
    } catch(error){
        return res.json({status:411, msg: 'Invalid token.' });
    }
}

export default tokenValidity;
