const jwt = require ('jsonwebtoken')
const User = require('../models/user')

const authentication = (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token,process.env.SECRET_KEY)
        console.log("UserID>>>",user.userId)
        User.findByPk(user.userId)
        .then(user =>{
            console.log(JSON.stringify(user));
           req.user = user;
           console.log(req.user)
            next();
        })
    }
    catch (err){
        console.log(err)
        return res.status(401).json({success:false})
    }
}

module.exports={
    authentication
}