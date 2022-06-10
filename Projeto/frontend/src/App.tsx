import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Container from "./components/Container/Container";

import Navbar from "./components/Navbar/Navbar";

import { UserProvider } from "./context/AuthProvider";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import CreatePet from "./pages/Pets/Create/CreatePet";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/PrivateRoutes/PrivateRoutes";
import NotFound from "./pages/NotFound/NotFound";
import ViewPet from "./pages/Pets/ViewPet/ViewPet";
import Group from "./components/Group/Group";

function App() {
  function privateRoute(component: JSX.Element) {
    return <ProtectedRoute>{component}</ProtectedRoute>;
  }

  return (
    <BrowserRouter>
      <UserProvider>
        <Toaster />
        <Group>
          <Navbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/pet/new" element={<CreatePet />} />
              <Route path="/pet">
                <Route path=":id" element={<ViewPet />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </Group>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
