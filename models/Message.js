const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const populationFields = "user";

postSchema.post("save", async (doc) => {
  await doc.populate(populationFields);
});

function populateFields() {
  this.populate(populationFields);
}

postSchema.pre("find", populateFields);
postSchema.pre("findOne", populateFields);
postSchema.pre("findOneAndUpdate", populateFields);

module.exports = mongoose.model("messages", postSchema);
