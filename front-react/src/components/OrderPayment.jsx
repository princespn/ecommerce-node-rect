import React from "react";

const OrderPayment = ({ payment, setPayment, onNext }) => {
  return (
    <div className="bg-white p-6 shadow rounded">
      <h3 className="text-xl font-bold mb-4">Payment Method</h3>

      <label className="flex items-center mb-3">
        <input
          type="radio"
          value="cod"
          checked={payment === "cod"}
          onChange={(e) => setPayment(e.target.value)}
        />
        <span className="ml-2">Cash on Delivery</span>
      </label>

      <label className="flex items-center mb-3">
        <input
          type="radio"
          value="online"
          checked={payment === "online"}
          onChange={(e) => setPayment(e.target.value)}
        />
        <span className="ml-2">Online Payment</span>
      </label>

      <button
        onClick={onNext}
        className="w-full mt-4 bg-blue-600 text-white p-3 rounded"
      >
        Review Order
      </button>
    </div>
  );
};

export default OrderPayment;
