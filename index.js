const express = require("express");
const methodOverride = require('method-override');
require('dotenv').config();

const database= require("./config/database");
database.connect();

const app = express();
app.use(methodOverride('_method'));

const port = process.env.PORT; 
const route = require("./routes/client/index.route.js");
const routeAdmin = require("./routes/admin/index.route.js");

app.set("views","./views");
app.set("view engine","pug");

app.use(express.static("public"));

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
