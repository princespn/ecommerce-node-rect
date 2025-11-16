import api from "../api/axios";

export async function register({ fullname, mobile, email, password, confirm_password }) {
  const res = await api.post('/user/register', { fullname, mobile, email, password, confirm_password });
  return res.data;
}

export async function login({ email, password }) {
  const res = await api.post('/user/login', { email, password });
  const { token } = res.data;
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return res.data;
}

export function logout() {
  try {
    api.post('/logout');
  } catch (e) {
    // ignore
  }
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
}



  export const getCountries = async () => {
    const res = await api.get("/country");
    return res.data;
  };

  export const categories = async () => {
    const res = await api.get("/categories");
    return res.data;
  };

  export const productsByCategory = async (categoryId) => {
    try {
      const res = await api.get(`/products/${categoryId}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching products for category:", error);
      throw error;
    }
  };
  

  export const checkUserExist = async (user_id) => {
    const res = await api.post("/checkUserExist", { user_id });
    return res.data;
  };