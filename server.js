const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileId = require('./controllers/profileId');
const searchImage = require('./controllers/searchImage');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('success') });
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profileId.handleProfileId(db));
app.put('/image', searchImage.handleSearchImage(db));
app.post('/imageurl', (req, res) => searchImage.handleApiCall(req, res));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});


