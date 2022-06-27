let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let GenreSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100 },
});

GenreSchema.virtual("url").get(() => {
  return "/catalog/genre/" + this.name;
});

module.exports = mongoose.model("Genre", GenreSchema);
