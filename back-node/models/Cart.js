import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  items: [
    {
      product_id: String,
      name: String,
      price: Number,
      imageUrl: String,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

//export CartSchema mongoose.model("Cart", CartSchema);
const CartS = mongoose.model("Cart", CartSchema);

export default CartS;
