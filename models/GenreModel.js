const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GenreSchema = new Schema({
  name: String,
  url: String,
});
const GenreModel = mongoose.model("Genre", GenreSchema);

module.exports = GenreModel;
