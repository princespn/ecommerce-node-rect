import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Address State
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  // Payment Option
  const [payment, setPayment] = useState("cod");

  useEffect(() => {
    // Check login
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

  // Total amount
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Place order API
  const placeOrder = () => {
    api
      .post("/order/create", {
        user_id: user.id,
        address: address,
        payment_method: payment,
        total: total,
      })
      .then((res) => {
        navigate(`/order-success/${res.data.order_id}`);
      });
  };

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Order Process
      </h2>

      {/* ---------- STEP 1: ADDRESS ---------- */}
      {step === 1 && (
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-bold mb-4">Shipping Address</h3>

          <input
            type="text"
            placeholder="Full Name"
            className="input"
            value={address.name}
            onChange={(e) =>
              setAddress({ ...address, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="input"
            value={address.phone}
            onChange={(e) =>
              setAddress({ ...address, phone: e.target.value })
            }
          />

          <textarea
            placeholder="Address"
            className="input"
            value={address.addressLine}
            onChange={(e) =>
              setAddress({ ...address, addressLine: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="City"
            className="input"
            value={address.city}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Pincode"
            className="input"
            value={address.pincode}
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
          />

          <button
            onClick={() => setStep(2)}
            className="w-full mt-4 bg-blue-600 text-white p-3 rounded"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {/* ---------- STEP 2: PAYMENT ---------- */}
      {step === 2 && (
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
            onClick={() => setStep(3)}
            className="w-full mt-4 bg-blue-600 text-white p-3 rounded"
          >
            Review Order
          </button>
        </div>
      )}

      {/* ---------- STEP 3: REVIEW ORDER ---------- */}
      {step === 3 && (
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
            className="w-full mt-6 bg-green-600 text-white py-3 rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
