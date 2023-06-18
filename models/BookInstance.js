const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "BookModel" },
});
const BookInstanceModel = mongoose.model("BookInstance", BookInstanceSchema);
module.exports = BookInstanceModel;
