import React from "react";

const OrderAddress = ({ address, setAddress, onNext, error }) => {
  return (
    <div className="bg-white p-6 shadow rounded">
      <h3 className="text-xl font-bold mb-4">Billing Address</h3>

      {/* Error message */}
      {error && (
        <p className="text-red-600 mb-3 text-center font-medium">{error}</p>
      )}

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        className="input"
        value={address.name}
        onChange={(e) => setAddress({ ...address, name: e.target.value })}
      />

      {/* Email (auto-filled, not editable) */}
      <input
        type="email"
        placeholder="Email"
        className="input bg-gray-100 cursor-not-allowed"
        value={address.email || ""}
        disabled
      />

      {/* Phone */}
      <input
        type="text"
        placeholder="Phone Number"
        className="input"
        value={address.mobile}
        onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
        disabled
      />

      {/* Address Line */}
      <textarea
        placeholder="Address"
        className="input"
        value={address.full_address}
        onChange={(e) =>
          setAddress({ ...address, full_address: e.target.value })
        }
      />

      {/* City */}
      <input
        type="text"
        placeholder="City"
        className="input"
        value={address.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
      />

      {/* Pincode */}
      <input
        type="text"
        placeholder="Pincode"
        className="input"
        value={address.pincode}
        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
      />

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-full mt-4 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default OrderAddress;
