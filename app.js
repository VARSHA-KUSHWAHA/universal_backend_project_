const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const path = require("path");
require("dotenv").config();
const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
console.log("process.env.PORT",process.env.PORT);
const dbConnect=require('./db/dbConnect');
dbConnect();
const subject=require("./models/subject.model");

const userRouter=require("./routes/user.route");
app.use("/",userRouter);
app.listen(process.env.PORT, function () {
  console.log(`server listening on process.env.PORT http://localhost:${process.env.PORT}`);
});


// https://github.com/VARSHA-KUSHWAHA/universal_backend_project_.git