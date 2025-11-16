import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Schema
const CategorySchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
