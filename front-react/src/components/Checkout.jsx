import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const userId = "12345";
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/cart/${userId}`).then((res) => setCart(res.data.items || []));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    api
      .post("/order/create", {
        user_id: userId,
        address: form,
      })
      .then((res) => {
        navigate(`/order-success/${res.data.order_id}`);
      });
  };

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Address Form */}
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">Delivery Address</h3>

          {Object.keys(form).map((key) => (
            <input
              key={key}
              placeholder={key}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          {cart.map((item) => (
            <div key={item.product_id} className="flex justify-between mb-3">
              <span>{item.name} × {item.quantity}</span>
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
            className="mt-6 w-full bg-green-600 text-white py-3 rounded"
          >
            Place Order
          </button>
        </div>

      </div>
    </section>
  );
};

export default Checkout;
