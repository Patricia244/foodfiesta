import jwt from 'jsonwebtoken'

const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers
    if(!token){
        return res.json({success:false,message:"Not authorized login again"})
    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = tokenDecode.id
        next()
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export default authMiddleware