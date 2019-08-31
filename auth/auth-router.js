const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../database/dbUsers');


router.post('/register', async (req, res) => {
    const newuserName = req.body;
    
    if (newuserName.username && newuserName.password) {
      try {
        const myhash = bcrypt.hashSync(newuserName.password , 10);
        newuserName.password = myhash;
        const insertedUser = await db.add(newuserName)
        res.status(200).json(insertedUser);
      }
    
      catch (err) {
        res.status(500).json('There was a problem with your request', err.message);
      }




    } else {
      res.status(403).json({message: 'Provide username and password for registration'});
    }
  
  
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
