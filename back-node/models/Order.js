import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    items: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    address: {
      name: String,
      phone: String,
      addressLine: String,
      city: String,
      pincode: String,
    },

    total: Number,

    payment_method: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },

    status: {
      type: String,
      default: "pending", // pending → confirmed → shipped → delivered
    },

    order_number: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("orders", OrderSchema);
