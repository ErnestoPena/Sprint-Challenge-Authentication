/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const db = require('../database/dbUsers');
const bcrypt = require('bcrypt');


//MIDDLEWARE TO VALIDATE IF COOKIE IS EXISTING AND VALID
  function verifyLogedUser(req , res , next) {
        
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(400).json({you: 'shall not pass!'});
    }
}

//MIDDLEWARE TO VERIFY NEW USER AND CREATE THE COOKIE
  async function createCookie(req, res, next) {
    const {username , password} = req.body;
    try {
      if(username && password) {
        const [user] = await db.findByUsername(username);

        if (user && bcrypt.compareSync(password , user.password)) {
          console.log(user)
          //req.session.user = user.username;
          req.params.username = user.username
          next();
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
  }


module.exports = {  
                verifyLogedUser,
                createCookie
              };