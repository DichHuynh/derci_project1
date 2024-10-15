const mongoose = require("mongoose")
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
  title: String,
  parent: String,
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
      type:Boolean,
      default: false
  },
  deletedAt: Date,
  slug: {type: String, slug: "title", unique: true, default:"default-slug"}
},{
  timestamps: true
});

const Record = mongoose.model("Record", categorySchema, "records");
module.exports = Record;