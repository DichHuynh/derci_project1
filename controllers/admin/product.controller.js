const Product = require("../../model/product.model");

module.exports.index = async (req, res) => {

    // lọc hoạt động theo nội dung trạng thái trên param url
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

    const product = await Product.find(find).limit(pagination.limit).skip(pagination.skip);
    res.render("admin/pages/product/index.pug", {
        title: 'Product Page',
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
    
    await Product.updateOne({_id:id}, {"status": status});
    res.redirect("back");
}

