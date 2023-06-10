const express = require('express');
const serverless = require('serverless-http')
const app = express();
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose')
const UserModel = require('../models/Users')

const cors = require('cors');


app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://chbm:chbm@cluster0.bpddoti.mongodb.net/deploy')  

router.get('/', (req, res) => {
    res.send("The App is running")
})



router.get('/getUsers', (req, res) => {
    UserModel.find({}).then((data) => {
        if (!data) {
            res.json({message : "Error"});
          } else {
            res.json(data);
          }
    }).catch(e => {
        res.json({message : "Error"});
    })
     
  });
  
router.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
  
    res.json(user);
  });

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)