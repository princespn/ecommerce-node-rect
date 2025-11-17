import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

// FUNCTION: Get Logged-in user OR create guest ID
const getUserId = () => {
  const loggedUser = localStorage.getItem("user_id");
  if (loggedUser) return loggedUser;

  let guest = localStorage.getItem("guest_id");
  if (!guest) {
    guest = "guest_" + Date.now();
    localStorage.setItem("guest_id", guest);
  }
  return guest;
};

const CartList = () => {
  const navigate = useNavigate();
  const userId = getUserId();

  const [cart, setCart] = useState([]);

  // Load Cart from API
  const loadCart = () => {
    api.get(`/cart/${userId}`).then((res) => {
      setCart(res.data?.items || []);
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Increase / Decrease
  const updateQuantity = (product_id, action) => {
    api
      .post("/cart/update", { user_id: userId, product_id, action })
      .then(() => loadCart());
  };

  // Delete Item
  const removeItem = (product_id) => {
    api
      .delete("/cart/remove", { data: { user_id: userId, product_id } })
      .then(() => loadCart());
  };

  // Checkout Handler — No login needed
  const handleCheckout = () => {
    navigate("/checkouts"); // ✔ always go to checkout
  };

  return (
    <section className="py-8 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      {/* When cart is empty */}
      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="bg-white p-4 shadow rounded-xl flex gap-4 justify-between"
              >
                <div className="flex gap-4">
                  <img
                    src={item.imageUrl}
                    className="w-20 h-20 object-cover rounded"
                    alt=""
                  />

                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>₹{item.price}</p>

                    {/* Quantity Update */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, "dec")
                        }
                        className="px-3 py-1 bg-gray-300 text-black rounded"
                      >
                        -
                      </button>

                      <span className="text-lg">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, "inc")
                        }
                        className="px-3 py-1 bg-gray-300 text-black rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.product_id)}
                  className="bg-red-600 text-white px-4 py-2 rounded h-fit"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4"
            >
              Continue Shopping
            </button>

            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CartList;
