const Product = require("../../model/product.model");

// lọc hoạt động theo nội dung trạng thái trên param url
module.exports.index = async (req, res) => {

    let find = {
        deleted: false,
    }
    if(req.query.status){
        find.status = req.query.status;
        }

    // set các thuộc tính để design bộ lọc
    const filterHelper = require("../../helper/filter.js");
    const filterStatus = filterHelper(req.query);
    // let filterStatus = [
    //     { name: "Tất cả", status:"", class: ""},
    //     { name: "Đang hoạt động", status:"active", class:""},
    //     { name: "Ngưng hoạt động", status:"inactive", class:""}
    // ]

    // if(req.query.status){
    //     let index = filterStatus.findIndex(item => item.status == req.query.status);
    //     filterStatus[index].class = "active";
    // }
    // else{
    //     filterStatus[0].class = "active";
    // }
// Tìm kiếm sản phẩm
    const searchHelper = require("../../helper/Search.js");
    const search = searchHelper(req.query);
    if(search.regex){
        find.title = search.regex;
    }
    
    // let search = "";
    // if (req.query.keyword){
    //     search = req.query.keyword;
    //     const regex = new RegExp(search, "i"); // xây dựng dữ liệu cho biến regex là động hơn
    //     find.title = regex; // gán ìm kiếm the title vào trên để hiển thị sản phẩm.
    // }

    // Tính năng phân trang
    const paginationHelper = require("../../helper/pagination.js");
    const pagination = paginationHelper(req.query);
    //tính tổng số trang cần phân
    const productCount = await Product.countDocuments(find);
    const totalPage = Math.ceil(productCount / pagination.limit);

    const product = await Product.find(find).limit(pagination.limit).skip(pagination.skip).sort({position:"desc"});
    res.render("admin/pages/product/index.pug", {
        pageTitle: 'Product Page',
        products: product,
        filterStatus: filterStatus,
        keyword: search.keyword,
        totalPage: totalPage,
        pagination: pagination
    });
};

// Tính năng thay đổi trạng thái sản phẩm.
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    req.flash("success","Cập nhật thành công!");
    
    await Product.updateOne({_id:id}, {"status": status});
    
    res.redirect("back");
}

// Tính năng thay đổi nhiều trạng thái
module.exports.changeMultiStatus = async (req, res) => {
        const ids = req.body.ids.split(","); // Trim any whitespace around IDs
        const type = req.body.type;

        switch (type) {
            case "active":
                await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
                break;
            case "inactive":
                await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
                break;
            case "delete-all":
                await Product.updateMany({ _id: { $in: ids } }, {deleted: "true", deleteAt: new Date()});
            case "change-position":
                for(const item of ids){
                    let [id,position] = item.split("-");
                    position = parseInt(position);
                    await Product.updateOne({_id:id}, {"position": position});
                }
            default:
                // Optionally handle unknown types
                break;
        }
        res.redirect("back");
}
// module Delete Item thực hiện xóa vĩnh viễn
// module.exports.deleteItem = async (req,res) =>{
//     const id = req.params.id;
//     await Product.deleteOne({_id:id});
//     res.redirect("back");
// }

// xóa mềm sản phẩm
module.exports.deleteItem = async (req,res) =>{
    const id = req.params.id;
    await Product.updateOne({_id:id},{deleted: true, deletedAt: new Date()});
    res.redirect("back");
}

// Tạo ra sản phẩm mới
module.exports.create = async (req,res) =>{
    res.render("admin/pages/product/create.pug", {
        pageTitle: "Create new product"
    })
}
module.exports.createPost = async (req,res) =>{
    if(req.body.title == ""){
        req.flash("error","Title is required");
        return res.redirect("back");
    }
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);

    if(req.body.position ==""){
        const count = await Product.countDocuments();
        req.body.position = count + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    
    const product = new Product(req.body);
    await product.save();
    res.redirect("/admin/product");
}
// Chỉnh sửa sản phẩm
module.exports.edit = async (req,res) =>{
    const id = req.params.id;
    const find={
        deleted: "false",
        _id:id
    }
    const productEdit = await Product.findOne(find);
    res.render("admin/pages/product/edit.pug", {
        pageTitle: "Product Edit",
        product: productEdit
    })
}
module.exports.editPut = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Parse numerical fields and validate
      req.body.price = parseFloat(req.body.price);
      req.body.stock = parseFloat(req.body.stock);
      req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  
      if (isNaN(req.body.price) || isNaN(req.body.stock) || isNaN(req.body.discountPercentage)) {
        req.flash("error", "Price, Stock, and Discount Percentage must be valid numbers");
        return res.redirect("back");
      }
  
      // Handle position field
      if (req.body.position === "") {
        const count = await Product.countDocuments();
        req.body.position = count + 1;
      } else {
        req.body.position = parseInt(req.body.position);
        if (isNaN(req.body.position)) {
          req.flash("error", "Position must be a valid number");
          return res.redirect("back");
        }
      }
  
      // Update product
      await Product.updateOne({ _id: id }, req.body);
      res.redirect("/admin/product");
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while updating the product");
      res.redirect("back");
    }
  };

// chi tiết sản phẩm
module.exports.detail = async (req, res) =>{
    const find = {
        deleted: false,
        _id: req.params.id
    }
    const productDetail = await Product.findOne(find);
    res.render("admin/pages/product/detail.pug", {
        pageTitle: "Product Detail",
        product: productDetail
    })
}
  