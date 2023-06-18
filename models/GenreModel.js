const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GenreSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
});
GenreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});
const GenreModel = mongoose.model("Genre", GenreSchema);

module.exports = GenreModel;
