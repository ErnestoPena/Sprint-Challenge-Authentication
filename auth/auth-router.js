const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../database/dbUsers');


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

router.post('/login', async (req, res) => {
  const credentials = req.body;
    
    try {
      if(credentials.username && credentials.password) {
        const [user] = await db.findByUsername(credentials.username);

        console.log(user)
        
        if (user && bcrypt.compareSync(credentials.password , user.password)) {
          req.session.user = user;
          res.status(200).json({message:`Welcome ${user.username}`})
        } else {
          res.status(500).json({message: "Invalid credentials"})
        }
      } else {
        res.status(403).json({message: 'Provide credentials to login'})
      }
    }
    catch (err) {
      res.status(500).json(err.message);
    }
});

module.exports = router;
