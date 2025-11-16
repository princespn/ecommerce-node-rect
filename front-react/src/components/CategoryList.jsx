import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/list/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <section className="py-8 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Link key={cat._id} to={`/products/${cat.name}`}>
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer">
                <img
                  src={cat.image || "https://via.placeholder.com/150"}
                  alt={cat.name}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <p className="text-gray-800 font-medium">{cat.name}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No categories found.
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryList;
