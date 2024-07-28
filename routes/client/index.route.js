const productRoutes = require("./product.route.js");
const homeRoutes = require("./home.route.js");

module.exports = (app) =>{
    app.use("/product", productRoutes);
    app.use("/", homeRoutes);
}