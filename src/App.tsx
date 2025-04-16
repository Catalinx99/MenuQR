import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Layout from "./components/Layout";
import { Header } from "./components/Header";
import { IFooter } from "./components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Rutele fără Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutele cu Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
      </Routes>
      <IFooter />
    </Router>
  );
};

export default App;
