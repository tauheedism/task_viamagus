const Sequelize = require("sequelize");
const  sequelize  = require("../util/database");

const taskAssign = sequelize.define('task',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    task :{
         type:Sequelize.STRING,
         allowNull:false
    }

})

module.exports = taskAssign