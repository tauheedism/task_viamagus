const path = require("path");

const express = require("express");
const cors = require('cors')
const dotenv=require('dotenv');

const bodyParser = require("body-parser");


// Backend Routes
const sequelize = require("./util/database");
const userRoutes=require('./routes/user');
const taskRoutes = require('./routes/task');
const app = express();

// Models
const User= require('./models/user')
const Task= require('./models/taskAdd')
const Group = require('./models/group')
const userGroup = require('./models/userGroup');
const taskModel = require('./models/tasks')


// Associations

// one to many relationship between user and chat
User.hasMany(Task);
Task.belongsTo(User);

User.hasMany(taskModel);
taskModel.belongsTo(User)

// many to many relationship between user and his in group created users
User.hasMany(userGroup)
Group.hasMany(userGroup)

// many to one relationship between the group created by the user and chat in the group 
Group.hasMany(taskModel)
taskModel.belongsTo(Group)

//one to one relation between the group's user and the chat in that particular group
userGroup.belongsTo(User)
userGroup.belongsTo(Group)

app.use(cors());
dotenv.config();

// app.use(bodyParser.urlencoded({extended:false}));//thsi is for handling forms 
app.use(bodyParser.json());  //this is for handling jsons

app.use(userRoutes);
app.use(taskRoutes);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
