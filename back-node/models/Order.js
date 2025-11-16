import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },

    items: [
      {
        product_id: String,
        name: String,
        price: Number,
        quantity: Number,
        imageUrl: String,
      },
    ],

    address: {
      fullName: String,
      phone: String,
      pincode: String,
      addressLine: String,
      city: String,
      state: String,
    },

    totalAmount: Number,
    paymentStatus: { type: String, default: "pending" },
    orderStatus: { type: String, default: "processing" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
