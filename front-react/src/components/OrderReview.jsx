import React from "react";

const OrderReview = ({ cart, total, placingOrder, placeOrder }) => {
  return (
    <div className="bg-white p-6 shadow rounded">
      <h3 className="text-xl font-bold mb-4">Review Order</h3>

      {cart.map((item) => (
        <div key={item.product_id} className="flex justify-between mb-3">
          <span>
            {item.name} × {item.quantity}
          </span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}

      <hr className="my-4" />

      <h3 className="text-xl font-bold flex justify-between">
        <span>Total:</span>
        <span>₹{total}</span>
      </h3>

      <button
        onClick={placeOrder}
        disabled={placingOrder}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded"
      >
        {placingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderReview;
