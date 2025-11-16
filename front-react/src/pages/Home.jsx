import CategoryList from "../components/CategoryList";
//import LoginForm from "../components/LoginForm";
//import RegisterForm from "../components/RegisterForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MyShop</h1>
          <nav>
            <a href="/login" className="mr-4 hover:underline">
              Login
            </a>
            <a href="/register" className="hover:underline">
              Register
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        {/* Category section */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
          <CategoryList />
        </div>

      
      </div>
    </div>
  );
}
