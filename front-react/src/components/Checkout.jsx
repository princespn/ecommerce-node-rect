import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ⛔ If no user → redirect to login
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(savedUser);
    setUser(userData);

    // Load cart
    api.get(`/cart/${userData.id}`).then((res) => {
      setCart(res.data.items || []);
    });
  }, []);

  // Total calculation
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    api
      .post("/order/create", {
        user_id: user.id,
        address: "Default address",
      })
      .then((res) => {
        navigate(`/order-success/${res.data.order_id}`);
      });
  };

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

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
