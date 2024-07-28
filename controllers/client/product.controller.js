const Product = require("../../model/product.model.js");

module.exports.index = async (req,res)=> {
    const products = await Product.find({
        status: 'active',
        deleted: false
    });
    const newProduct = products.map(item =>{
        item.newPrice = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
        return item;
    });
    res.render("client/page/products/index.pug",{
        pageTitle: "List product",
        products: newProduct
    });
}

