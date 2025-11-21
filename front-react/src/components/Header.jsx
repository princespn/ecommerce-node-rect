import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          MyShop
        </h1>

        <nav className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="hover:underline text-white">
                Login
              </Link>
              <Link to="/register" className="hover:underline text-white">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-medium">Hi, {user.name}</span>

              <button
                className="bg-red-500 px-4 py-1 rounded"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Header;
