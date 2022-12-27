const Sequelize = require("sequelize");
const  sequelize  = require("../util/database");

const groupChat = sequelize.define('groupChat',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    GroupName :{
         type:Sequelize.STRING,
         allowNull:false
    }

})

module.exports = groupChat