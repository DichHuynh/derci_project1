const express = require("express");
const methodOverride = require('method-override');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require('body-parser');
require('dotenv').config();

const database= require("./config/database");
database.connect();

const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT; 
const route = require("./routes/client/index.route.js");
const routeAdmin = require("./routes/admin/index.route.js");

app.set("views",`${__dirname}/views`);
app.set("view engine","pug");

app.use(express.static(`${__dirname}/public`));
// define flash 
app.use(cookieParser('HUYNHDICH'));
app.use(session({cookie:{maxAge:60000}}));
app.use(flash());

route(app);
routeAdmin(app);
// app.get("/", (req, res)=>{
//     res.render("client/page/home/index.pug");
// });

// app.get("/product", (req, res)=>{
//     res.render("client/page/products/index.pug")
// });

app.listen(port,()=>{
    console.log("Server is running on port " + port);
});
