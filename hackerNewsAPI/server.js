const express = require('express');
const bP = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const fs = require('fs');
const archive = require('./controllers/archive');
const signin = require('./controllers/signin');


const password = fs.readFileSync('./pas.txt', 'utf8').toString();

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: password,
        database: 'hackernews'
    }
});

const app = express();

app.use(bP.json());
app.use(cors());

app.get('/', (req,res) =>{
    db.select('*').from('news')
    .then(i => {
        res.json(i)
    })
})

app.post('/archive', (req, res) => {archive.handleArchive(req,res,db)});
app.post('/signin', (req, res) => {signin.handlerSignin(req,res)});
app.listen(3000, () => {
    console.log('app is running on port 3000.')
})