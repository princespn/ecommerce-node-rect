import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

import OrderAddress from "../../components/OrderAddress";
import OrderPayment from "../../components/OrderPayment";
import OrderReview from "../../components/OrderReview";

const OrderPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    full_address: "",
    city: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("cod");
/*
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login", { state: { from: "/order" } });
      return;
    }

    const userData = JSON.parse(savedUser);
    setUser(userData);

    api
      .get(`/cart/${userData.id}`)
      .then((res) => {
        setCart(res.data.items || []);
      })
      .finally(() => setLoading(false));
  }, []); */

  // 🔹 Load User & Address
useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    navigate("/login", { state: { from: "/order" } });
    return;
  }

  const parsedUser = JSON.parse(savedUser);
  setUser(parsedUser);

  // Fetch user profile details from API
  api.get(`/user/${parsedUser.id}`)
    .then((res) => {
      const u = res.data.user;

      // Auto-fill user details
      setAddress((prev) => ({
        ...prev,
        name: u.name || "",
        mobile: u.mobile || "",
        email: u.email || "",
      }));
    })
    .catch(() => {
      setError("Failed to load user details.");
    });

  // Load cart
  api.get(`/cart/${parsedUser.id}`)
    .then((res) => setCart(res.data.items || []))
    .catch(() => setError("Unable to load cart items."))
    .finally(() => setLoading(false));
}, []);


  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const validateAddress = () => {
    if (
      !address.name ||
      !address.mobile ||
      !address.full_address ||
      !address.city ||
      !address.pincode
    ) {
      setError("Please fill all address details.");
      return false;
    }
    setError("");
    return true;
  };

  const placeOrder = () => {
    if (placingOrder) return;

    setPlacingOrder(true);

    api
      .post("/order/create", {
        user_id: user.id,
        address: address,
        payment_method: payment,
        total: total,
      })
      .then((res) => {
        navigate(`/order-success/${res.data.order_id}`);
      })
      .catch(() => {
        setError("Order failed. Try again.");
      })
      .finally(() => setPlacingOrder(false));
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading your order...</h2>;
  }

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Order Process</h2>

      {error && (
        <p className="text-red-600 text-center mb-4 font-semibold">{error}</p>
      )}

      {step === 1 && (
        <OrderAddress
          address={address}
          setAddress={setAddress}
          onNext={() => validateAddress() && setStep(2)}
        />
      )}

      {step === 2 && (
        <OrderPayment
          payment={payment}
          setPayment={setPayment}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <OrderReview
          cart={cart}
          total={total}
          placingOrder={placingOrder}
          placeOrder={placeOrder}
        />
      )}
    </section>
  );
};

export default OrderPage;
