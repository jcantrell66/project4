const User = require('../models/user');
// const History = require('../models/game');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
// now s3 can crud on our s3 buckets

module.exports = {
  signup,
  history,
  login
};

async function signup(req, res) {
  console.log(req.body, '<= req.body in signup')

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  // FilePath unique name to be saved to our butckt
  // const filePath = `${uuidv4()}/${req.file.originalname}`
  // const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
  //your bucket name goes where collectorcat is 
  //////////////////////////////////////////////////////////////////////////////////
  // s3.upload(params, async function(err, data){
    // console.log(data, 'from aws') // data.Location is our photoUrl that exists on aws
    const user = new User({username: req.body.username, password: req.body.password});
    console.log(user, '<= new user after called model')
    try {
      await user.save();
      console.log(user, '<= user after try')
      const token = createJWT(user); // user is the payload so this is the object in our jwt
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  // })
  //////////////////////////////////////////////////////////////////////////////////
}

function history(req, res) {
  console.log(req, '<= this should be the user id')
  const history = new History({
    user: req.body
  })
}




async function login(req, res) {
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
