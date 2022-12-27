const { response } = require("express");
const Task = require("../models/taskAdd");
const User=require("../models/user");
const userGroup = require('../models/userGroup')
const groupChat = require('../models/group')
const Message = require('../models/tasks')
const Sequelize=require('sequelize');
const op = Sequelize.Op;

exports.addTask =((req,res,next)=>{
    const{name,des,categ}=req.body
   console.log(name,des,categ)
   Task.create({name,des,categ,userId:req.user.id})
  // req.user.createExpense({name,des,categ})
    .then((response)=>{
      res.status(201).json({data:response})
    })
    .catch(err=>res.status(500).json({err}))
  })
  
  exports.getTask =(req,res,next)=>{
    // Expense.findAll()

    Task.findAll({where:{userId:req.user.id}})
    // req.user.getExpenses()
  .then(response=>{
   return res.status(200).json({response,user:req.user})
  })
  .catch(err=>{
    return res.status(500).json({err,success:false})})
  }
  
  exports.deleteDetails=(req,res,next)=>{
  const id = req.params.id;
  // Expense.destroy({where:{id:id}})
  Task.destroy({where:{id:id,userId:req.user.id}})
  .then((noOfRows)=> {
    if (noOfRows===0) {
     return res.status(404).json({success:false,message:'Task does not belong to user'})
    }
    return res.status(200).json({success:true,message:'successful'})})
      .catch(err=>{console.log(err)})
  }

  exports.groupMessage = (req,res)=>{
    const GroupName = req.body.groupChatting;
     console.log(GroupName);
     groupChat.create({GroupName})
     .then(group =>{
       const groupId = group.id;
       userGroup.create({groupChatId: groupId, userId : req.user.id , isAdmin:true})
       .then(userGroup =>{
        res.status(201).json({message:"created"})
       })
     })
     .catch(err =>{
         console.log(err)
        res.status(500).json({message:"failed"})
     })      
 }

 exports.groupdetails = (req,res)=>{
  userGroup.findAll({where:{userId:req.user.id},isAdmin:true,include: [
    {
      model: groupChat,
      required: false,
    }
  ]})
  .then(result =>{
    res.status(200).json({data:result,user:req.user,message:"success"})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
 }

exports.postMessage =(req,res)=>{
  const groupId = req.params.id;
  const message = req.body.task;
  Message.create({task:message ,groupChatId : groupId , userId : req.user.id })
  .then(result =>{
    console.log(result)
    res.status(201).json({message:"created"})
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({message:"failed"}) 
  })
}

exports.getMessage = (req,res)=>{
  const groupid = req.params.id;
    Message.findAll({where:{groupChatId:groupid},include: [
      {
        model: User,
        required: false,
      }
    ]})
  .then(result =>{
   res.status(200).json({data:result,message:"success"})
  })
  .catch(err=>
   res.status(500).json({message:"failed"}))
}

exports.addUser = (req,res)=>{
  const name = req.body.user;
  const groupid = req.params.id;
  User.findOne({where :{name:name}})
  .then(user =>{
    console.log(user.id,"userid Tauheed siddiqui ")
    userGroup.create({userId:user.id,groupChatId:groupid , isAdmin:false})
    .then(result=>{
      res.status(201).json({message:"created"})
    })
  })
  .catch(err=>{
   res.status(500).json({message:"failed"})
  })
}

exports.getUser = (req,res)=>{
  const groupid = req.params.id;
  userGroup.findAll({where:{groupChatId:groupid},include: [
    {
      model: User,
      required: false,
    }
  ]})
  .then(result =>{
    res.status(200).json({data:result , message:"successful" , Address:req.user})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
}

exports.deleteUser = (req,res)=>{
  const groupid = req.params.id;
  const userId = req.body.userid;
  console.log("JUST TO CHECK GROUP ID",groupid,userId)
  userGroup.destroy({where:{groupChatId:groupid , userId:userId}})
  .then(result =>{
    res.status(200).json({message:"deleted"})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
}

exports.MakeAdmin = (req,res)=>{
  const groupid = req.params.id;
  const userId = req.body.userid;
  
  userGroup.update(  {isAdmin:true} , {where:{groupChatId:groupid , userId:userId}})
  .then(result =>{
    res.status(200).json({message:"MADE ADMIN"})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
}

exports.RemoveAdmin = (req,res)=>{
  const groupid = req.params.id;
  const userId = req.body.userid;
  
  userGroup.update(  {isAdmin:false} , {where:{groupChatId:groupid , userId:userId}})
  .then(result =>{
    res.status(200).json({message:"REMOVE ADMIN"})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
}