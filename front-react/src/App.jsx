import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import ProductList from "././pages/products/Prosucts";
import CartList from "./pages/carts/Carts";
import Checkout from "./pages/carts/CheckoutPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:categoryId" element={<ProductList />} />
        <Route path="/carts" element={<CartList />} />
        <Route path="/checkouts" element={<Checkout/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
