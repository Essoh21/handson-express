const mongoose = require("mongoose");
const BookSchema = mongoose.Schema;
const BookModelSchema = new BookSchema({
  title: String,
  author: [{ type: BookSchema.Types.ObjectId, ref: "Author" }],
  summary: String,
  ISBN: String,
});

const BookModel = mongoose.model("Book", BookModelSchema);

module.exports = BookModel;
