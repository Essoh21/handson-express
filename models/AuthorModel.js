const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
  name: { type: String, required: true },
  story: String,
});
const AuthorModel = mongoose.model("Author", AuthorSchema);
module.exports = AuthorModel;
