const { query, json } = require("express");
const express = require("express");
const connction = require("../connectionDb");
const route = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
var auth = require("../Services/authentication");
// saving new user post request

route.post("/signup", (req, res) => {
  let newUser = req.body;
  //test existance of user
  query = "select * from users where userEmail=?";
  connction.query(query, [newUser.email], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        //creation of new user
        query =
          "insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values(?,?,?,?,?,1)";
        connction.query(
          query,
          [
            newUser.name,
            newUser.lastname,
            newUser.email,
            newUser.password,
            newUser.phone,
          ],
          (err1, queryresult) => {
            if (!err1) {
              return res.status(200).json("user is saved in data base");
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json("user already exist !");

      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// login 
route.post("/login", (req, res) => {
  const logedUser = req.body;
  let query = "select u.userEmail,u.userPassword,r.libelleRole from users u,roles r where r.idRole=u.userRoleID and u.userEmail=?";

  connction.query(query, [logedUser.email], (err, resultQuery) => {
    if (!err) {

      if (resultQuery.length <= 0 || resultQuery[0].userPassword != logedUser.password) {
        return res.status(401).json("check your credentinals");
      } else if (resultQuery[0].userPassword == logedUser.password) {
        const response = { email: resultQuery[0].userEmail, role: resultQuery[0].libelleRole };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
        res.status(200).json({ token: accessToken });
      } else {
        return res.status(500).json(err);
      }
    } else {
      return res.status(500).json(err);
    }
  });



});

// send verifPass

route.post("/forgetPass", (req, res) => {
  const info = req.body;
  let query = "select userEmail,userPassword from users where userEmail=?";
  connction.query(query, [info.email], (err, queryResult) => {
    if (!err) {
      if (queryResult.length <= 0) {
        return res.status(500).json("no such user in the system");
      } else {


        return res.status(200).json("a reset password lonk is sent to your @");
      }
    } else {
      return res.status(500); json(err);
    }
  })
})

route.get("/getUserInfo", auth.authenticateToken, (req, res) => {
  let query = "select userName,userLastName,userEmail from users where userEmail=?";
  const userMail = req.body.email;
  connction.query(query, [userMail], (err, resultQuery) => {
    if (!err) {
      return res.status(200).json(resultQuery);
    }
    return res.status(500).json(err);
  })
})













module.exports = route;
