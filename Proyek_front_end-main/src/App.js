import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/producList';
import Home from './components/home';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

function App() {
  const token = !!localStorage.getItem('token');
  const [setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
      <Route
            path="/register"
            element={
              token ? (
                <Navigate to="/" replace={true} />
              ) : (
                <RegisterPage />
              )
            }
          />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            token ? (
              <Home />
            ) : (
              <Navigate to="/Home" replace />
            )
          }
        />
        <Route
          path="/Home"
          element={
            token ? (
              <ProductList addProduct={addProduct} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
