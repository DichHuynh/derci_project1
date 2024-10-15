const dashboardRoute = require("./dashboard.route.js");
const productRoute = require("./product.route.js");
const productCategory = require("./product-category.route.js");

module.exports = (app) =>{
    app.use("/admin/dashboard", dashboardRoute);
    app.use("/admin/product", productRoute);
    app.use("/admin/product-category", productCategory);
}