import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../util";
import { handleError } from "../util";

function Home() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const fetchProducts = async () => {
    try {
      const url = "https://mern-login-lp0c2n5xg-owais-projects-0caf9c40.vercel.app/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>Welcome, {loggedInUser}</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h5>{product.name}</h5>
          <h6>{product.price}</h6>
        </div>
      ))}
      <button onClick={handleLogout}>Logout</button>

      <ToastContainer />
    </div>
  );
}

export default Home;
