const Record = require("../../model/product-category.model.js");

module.exports.index = async (req, res) =>{
  let find = {
    status: 'active'
  };
  const records = await Record.find();
  res.render("admin/pages/product-category/product-category.pug",{
  record: records
});
};

module.exports.create = async (req, res) =>{
  res.render("admin/pages/product-category/create-category.pug",{
    pageTitle: "Tạo danh mục sản phẩm"
  });
}
module.exports.createPost = async (req, res) =>{
  const record = new Record(req.body);
  await record.save();
  res.redirect("/admin/product-category");
}
module.exports.changeStatus = async (req, res) =>{
  const id = req.params.id;
  const status = req.params.status;

  req.flash("succes", "Cập nhật thành công!");
  await Record.updateOne({_id: id}, {"status": status});
  res.redirect("back");
}
module.exports.edit = async (req, res) =>{
  const id = req.params.id;
  const find = {
    _id: id
  }
  const record = await Record.findOne(find);
  res.render("admin/pages/product-category/edit-category.pug",{
    pageTitle: "Chỉnh sửa danh mục",
    record: record
  });
}
module.exports.editPut = async (req, res) =>{
  const id = req.params.id;
  await Record.updateOne({_id: id}, req.body);
  res.redirect("/admin/product-category");
}