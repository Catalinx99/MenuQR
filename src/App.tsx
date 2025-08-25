import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Layout from "./components/Layout";

import PrivateRoute from "./components/PrivateRoute";
import { isAuthenticatedAtom, userAtom } from "./atoms/authAtoms";
import { useAtom } from "jotai";
import TemplatesList from "./pages/MenuList";
import { TemplatePreviewPage } from "./pages/TemplatePreviewPage";
import TemplatesDragDrop from "./pages/TemplateDrag";
import PaymentSuccess from "./pages/PaymentSuccess";

import ModernTemplate from "./pages/modernHomepage";
import { ModernFooter } from "./components/ModernFooter";
import { ModernHeader } from "./components/ModernHeader";
import ScrollToTop from "./components/ScrollToTop";
import { ThemePreviewPage } from "./pages/ChooseTheme";

const App: React.FC = () => {
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    // Verificăm dacă există un token în localStorage
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsAuthenticated(true);
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(savedUser);
    }
  }, [setIsAuthenticated, setUser]);

  return (
    <Router>
      <ScrollToTop />

      {window.location.pathname !== "/preview" && <ModernHeader />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutele cu Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute
              element={
                <Layout>
                  <ModernTemplate />
                </Layout>
              }
            />
          }
        />

        <Route
          path="/success"
          element={<PrivateRoute element={<PaymentSuccess />} />}
        />

        <Route
          path="/themepreview"
          element={<PrivateRoute element={<ThemePreviewPage />} />}
        />
        <Route
          path="/template"
          element={<PrivateRoute element={<TemplatesDragDrop />} />}
        />

        <Route
          path="/menulist"
          element={<PrivateRoute element={<TemplatesList />} />}
        />

        {/* Ruta /preview fără Header și Footer */}
        <Route path="/preview" element={<TemplatePreviewPage />} />
      </Routes>

      {/* Adăugăm Header și Footer doar pentru rutele care nu sunt '/preview' */}

      {/* {window.location.pathname !== "/preview" && <IFooter />} */}
      {window.location.pathname !== "/preview" && <ModernFooter />}
    </Router>
  );
};

export default App;
