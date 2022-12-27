const Sequelize = require ('sequelize')
const sequelize = require('../util/database')
const AddTask = sequelize.define('addtask',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement : true,
    allowNull:false,
    primaryKey:true
  },
  name:Sequelize.STRING,
  des:Sequelize.STRING,
  categ:Sequelize.INTEGER
})

module.exports=AddTask;

// const Sequelize = require("sequelize");
// const  sequelize  = require("../util/database");

// const Expense = sequelize.define('Expenses',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//    name :{
//         type:Sequelize.INTEGER,
//         allowNull:false
//     },
//     des:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     categ:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports = Expense