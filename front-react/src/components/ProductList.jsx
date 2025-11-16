import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ProductList = () => {
  const { categoryId } = useParams(); // categoryId = routeName
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get(`/list/products/${categoryId}`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data[0].items || []);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [categoryId]);

  const navigate = useNavigate();

  const handleAddToCart = async (item) => {
    try {
      const payload = {
        user_id: "12345", // later replace with auth userId
        product: {
            product_id: item._id,
          name: item.name,
          price: Number(item.price),
          imageUrl: item.imageUrl,
          quantity: 1
        }
      };
  
      await api.post("/cart/add", payload);
  
      navigate("/carts"); // go to cart page
  
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };
  
  return (
    <section className="py-8 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {categoryId} Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center"
            >
              <img
                src={item.imageUrl || "https://via.placeholder.com/200"}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />

              <p className="text-gray-900 font-semibold">{item.name}</p>
              <p className="text-gray-600 mb-2">₹{item.price}</p>

              <button
                onClick={() => handleAddToCart(item)}
                className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductList;
