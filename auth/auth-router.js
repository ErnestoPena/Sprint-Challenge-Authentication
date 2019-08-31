const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../database/dbUsers');
const authmiddleware = require('./authenticate-middleware');

router.post('/register', async (req, res) => {
    const newuserName = req.body;
    
    if (newuserName.username && newuserName.password) {
      const [verifyUser] = await db.findByUsername(newuserName.username);

      if (verifyUser) {
        res.status(403).json({message: `The username ${verifyUser.username} is already registered`})
      } else {
        try {
          const myhash = bcrypt.hashSync(newuserName.password , 10);
          newuserName.password = myhash;
          const insertedUser = await db.add(newuserName)
          res.status(201).json(insertedUser);
        }
      
        catch (err) {
          res.status(500).json('There was a problem with your request', err.message);
        }
      }

    } else {
      res.status(403).json({message: 'Provide username and password for registration'});
    }
});

router.post('/login' , authmiddleware.createCookie, async (req, res) => {
    try {
      res.status(200).json({message:`Welcome ${req.params.username}`})
    }
    catch (err) {
      res.status(500).json(err.message);
    }
});

router.get('/users', async (req,res) => {
  try {
      const getall = await db.find();
    res.status(200).json(getall);
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

module.exports = router;
