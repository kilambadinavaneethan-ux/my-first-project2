import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Expenses from "./pages/Expenses";
import Workers from "./pages/Workers";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { CustomerProvider } from "./context/CustomerContext";
import { auth } from "./firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <CustomerProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Navbar currentUser={currentUser} />

          <main className="page-container">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute user={currentUser}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customers"
                element={
                  <ProtectedRoute user={currentUser}>
                    <Customers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory"
                element={
                  <ProtectedRoute user={currentUser}>
                    <Inventory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses"
                element={
                  <ProtectedRoute user={currentUser}>
                    <Expenses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workers"
                element={
                  <ProtectedRoute user={currentUser}>
                    <Workers />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CustomerProvider>
  );
}

export default App;