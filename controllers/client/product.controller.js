const Product = require("../../model/product.model.js");

module.exports.index = async (req,res)=> {
    const products = await Product.find({
        status: 'active',
        deleted: false
    }).sort({position: "desc"});
    const newProduct = products.map(item =>{
        item.newPrice = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
        return item;
    });
    res.render("client/page/products/index.pug",{
        pageTitle: "List product",
        products: newProduct
    });
}

module.exports.detail = async (req, res) => {
    console.log(req.params.slug);
    const find ={
        status:'active',
        _slug: req.param.slug
    }
    const product = await Product.findOne(find);
    console.log(product);
    if(!product){
        res.status(404).send("Product not found");
        }
    else 
        res.render("client/page/products/detail.pug",{
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });
}

