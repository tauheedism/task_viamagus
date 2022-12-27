const express = require('express');


const router = express.Router();

const taskController = require('../controllers/taskControl');
const userAuthentication = require('../middleware/auth');

// CRUD Routes

router.post('/addTask',userAuthentication.authentication ,taskController.addTask);

router.get('/getTask',userAuthentication.authentication ,taskController.getTask);

router.delete('/del/:id',userAuthentication.authentication,taskController.deleteDetails);

// Group Routes

router.post('/postgroupChatting',userAuthentication.authentication,taskController.groupMessage)

router.get('/getgroupChat',userAuthentication.authentication,taskController.groupdetails)

router.post('/postmessage/:id',userAuthentication.authentication,taskController.postMessage)

router.get('/getmessage/:id',taskController.getMessage)

router.post('/AddUser/:id',taskController.addUser)

router.get('/getUser/:id',userAuthentication.authentication,taskController.getUser)

router.post('/deleteUser/:id',taskController.deleteUser)

router.post('/makeAdmin/:id',taskController.MakeAdmin)

router.post('/removeAdmin/:id',taskController.RemoveAdmin)

module.exports= router ;