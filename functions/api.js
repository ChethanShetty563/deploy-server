const express = require('express');
const serverless = require('serverless-http')
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.send("The App is running")
})

router.get('/users', (req, res)=> {
    res.send("Fetching the users")
})

router.get('/demo', (req, res) => {
    res.json([
      {
        id: '001',
        name: 'Smith',
        email: 'smith@gmail.com',
      },
      {
        id: '002',
        name: 'Sam',
        email: 'sam@gmail.com',
      }
    ])
})

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)