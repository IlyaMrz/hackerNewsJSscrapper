const express = require('express');
const bP = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const fs = require('fs');

const pas = fs.readFileSync('./pas.txt', 'utf8').toString();

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: pas,
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

app.listen(3000, () => {
    console.log('app is running on port 3000.')
})