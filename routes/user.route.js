const express = require("express");

const Router = express.Router();
const user=require("../models/user.model");






const users = require("../data/users");

Router.get("/", function (req, res) {
  res.send({
    message: "hello all users, welcome to the root page !",
    status: 1,
  });
});

Router.get("/home", function (req, res) {
  res.render("home.hbs",{
    data:{name:"Durgesh",address:"Mumbai"}
  });
});

Router.get("/login-page", function (req, res) {
  res.render("login.hbs");
})

//user email-send

const emailSend = require("../helper/email-send");
Router.get("/user-email-send/:user", async function (req, res) {
  const user = req.params.user;
  const emailInfo = await emailSend(user);
  if (emailInfo) {
    res.send({ message: `message sent successfully to ${user}`, status: 1 });
  } else {
    res.send({
      message: `message not sent to ${user} email ,please tryt again after sometime!`,
      status: 0,
    });
  }
});

//get all users data request
Router.get("/api/get-users", function (req, res) {
  if (users.length > 0) {
    res.send({
      message: "Fetched all users successfully",
      status: 1,
      users: users,
    });
  } else
    res.send({
      message: "users not found",
      status: 1,
    });
});

//get specific user by id data request
Router.get("/api/user/:id", function (req, res) {
  const id = req.params.id;
  console.log("id", id);
  if (users.length > 0) {
    const specificUser = users.filter((user) => {
      return user.id == id;
    });
    console.log("specificUser", specificUser);
    res.send({
      message: "Fetched all users successfully",
      status: 1,
      user: specificUser,
    });
  } else
    res.send({
      message: "users not found",
      status: 1,
    });
});

Router.post("/register", async function (req, res) {
  console.log("req.body", req.body);
  const { firstName,lastName,credits,status,image, username, password, role,address,contactNumber,gender, classes}= req.body;
  const userFind = await user.findOne({ username });
  console.log("userFind", userFind);
  if (userFind) {
    res.send({
      message:
        "user already exists with this email please login or signup with different email address",
      status: 0,
    });
  } else {
    const insertData = new user({
      firstName,
      lastName,
      status,
      image,
      credits,
      username,
      password,
      role,
      address,contactNumber,gender, 
      class:classes
    });
    const isInserted=await insertData.save();
    if (isInserted) {
      res.send({
        message: "user registration successfully",
        status: 1,
      });
    } else {
      res.send({
        message: "user registration failed",
        status: 0,
      });
    }
  }
});
Router.post("/login", async function (req, res) {
  console.log("req.body", req.body);
  const { email, password } = req.body;
  if (email && password) {
    const user = await dbConnect();
    const userFind = await user.findOne({ email });
    console.log("userFind", userFind);
    if (userFind) {
      if (userFind.password == password) {
        res.send({
          message: "user login successfully",
          status: 1,
        });
      } else {
        res.send({
          message: "Incorrect email address or password",
          status: 0,
        });
      }
    } else {
      res.send({
        message:
          "user email was not found ,please register first and try again",
        status: 0,
      });
    }
  } else {
    res.send({
      message: "user login failed, all fields are required",
      status: 0,
    });
  }
});

//post update api
Router.post("/update/:email", async function (req, res) {
  const email = req.params.email;
  const { name } = req.body;
  if (name) {
    const user = await dbConnect();
    const userFind = await user.findOne({ email });
    console.log("userFind", userFind);
    if (userFind) {
      const userUpdate = await user.updateOne({ email }, { $set: { name } });
      if (userUpdate.matchedCount > 0) {
        res.send({
          message: "user update successfully",
          status: 1,
        });
      } else {
        res.send({
          message: "user update failed",
          status: 0,
        });
      }
    } else {
      res.send({
        message:
          "user email was not found ,please register first and try again",
        status: 0,
      });
    }
  } else {
    res.send({
      message: "user update failed, all fields are required",
      status: 0,
    });
  }
});

//get delete user api
Router.get("/delete/:firstname", async function (req, res) {
  const firstname = req.params.firstname;
  const user = await dbConnect();
  const userFind = await user.findOne({ firstname });
  console.log("userFind", userFind);
  if (userFind) {
    const isUserDeleted = await user.deleteOne({ firstname });
    if (isUserDeleted) {
      res.send({ message: "user deleted", status: 1 });
    } else {
      res.send({ message: "user deletion failed", status: 0 });
    }
  } else {
    res.send({
      message: "user firstname was not found ,please register first and try again",
      status: 0,
    });
  }
});

module.exports = Router;
