const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('./../models/User');
const fetch = require('node-fetch');

//google login controller
const client = new OAuth2Client(process.env.GOOGLE_OATH);

const googleLogin = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_OATH })
    .then((response) => {
      // console.log('GOOGLE LOGIN RESPONSE',response)
      const { email_verified, name, email } = response.payload;
      console.log(response.payload);
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          //if user already in database , generate token
          if (user) {
            const token = jwt.sign(
              { userId: user.id },
              process.env.JWT_SECRET,
              {
                expiresIn: '1h',
              },
            );
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            //create user and random password and get user data from payload
            let password = email + process.env.JWT_SECRET;
            user = new User({
              name: response.payload.name,
              email: response.payload.email,
              image: response.payload.picture,
              password,
              places: [],
            });
            //save the new user in databases
            user.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with google',
                });
              }
              //generate token to the new user
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
              );
              const modifiedUser = data.toObject({ getters: true });
              res.status(200).json({
                userId: modifiedUser.id,
                email: modifiedUser.email,
                token,
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Google login failed. Try again',
        });
      }
    });
};

//facebook login controller
const facebookLogin = (req, res) => {
  const { id, accessToken } = req.body;

  const graphFbUrl = `https://graph.facebook.com/v2.11/${id}/?fields=id,name,email,picture&access_token=${accessToken}`;

  fetch(graphFbUrl, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let { name, email, picture } = response;
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: 'Facebook login failed. Try again',
          });
        } else {
          if (user) {
            const token = jwt.sign(
              { userId: user.id },
              process.env.JWT_SECRET,
              {
                expiresIn: '1h',
              },
            );
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            //create user and random password and get user data from payload
            let password = email + process.env.JWT_SECRET;
            let newUser = new User({
              name,
              email,
              image: picture.data.url,
              password,
              places: [],
            });
            //save the new user in databases
            newUser.save((err, newUser) => {
              if (err) {
                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with ffacebook',
                });
              }
              //generate token to the new user
              const token = jwt.sign(
                { _id: newUser._id },
                process.env.JWT_SECRET,
                {
                  expiresIn: '1h',
                },
              );
              const modifiedUser = newUser.toObject({ getters: true });
              res.status(200).json({
                userId: modifiedUser.id,
                email: modifiedUser.email,
                token,
              });
            });
          }
        }
      });
    });
};

exports.googleLogin = googleLogin;
exports.facebookLogin = facebookLogin;
