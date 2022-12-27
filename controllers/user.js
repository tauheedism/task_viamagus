const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

function stringValidator(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

function generateAccessToken(id,name){
  return jwt.sign({userId:id,name:name},process.env.SECRET_KEY)
}

exports.signup = async (req, res) => {
  try {
    const { name, email ,phoneNumber, password} = req.body;
    if (
      stringValidator(name) ||
      stringValidator(email) ||
      stringValidator(phoneNumber)||
      stringValidator(password)
    ) {
      return res
        .status(400)
        .json({ err: "Bad Parameters . Something is missing" });
    }
    User.findAll({where:{email : email}})
        .then(users =>{
            if(users.length === 1)
            {
                 res.status(402).json({message:"User already exists, Please Login"})
            }
            else
            {
              const saltrounds = 10;
              bcrypt.hash(password, saltrounds, async (err, hash) => {
                console.log(err);
                await User.create({name, email,phoneNumber,password:hash});
                res.status(201).json({ message: "Successfully created new user" });
              });
            }
        })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (stringValidator(email) || stringValidator(password)) {
    res
      .status(400)
      .json({ message: "Email-Id or password is missing", success: false });
  }
  console.log(password);
  User.findAll({ where: { email:email } })
    .then((user) => {
      if (user.length > 0) {
        bcrypt.compare(password,user[0].password,(err,result)=>{
          if (err) {
            res.status(500).json({success:false,message:'Something went wrong'})
          }
          if (result===true) {
            res
              .status(200)
              .json({ success: true, message: "User login successfully" ,token:generateAccessToken(user[0].id,user[0].name) });
          } else {
            return res
              .status(400)
              .json({ success: false, message: "Password is incorrect" });
          }
        })
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err, sucees: false });
    });
};