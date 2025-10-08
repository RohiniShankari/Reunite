import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Listings from "./pages/Listings.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import ListingDetail from "./pages/ListingDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import Messages from "./pages/Messages.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        
{/*         
        <Route path="/" element={<Listings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/messages" element={<Messages />} /> */}
        <Route path="/"element={<ProtectedRoute><Listings /></ProtectedRoute> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listing/:id/edit" element={<ProtectedRoute><UpdateListing /></ProtectedRoute>} />

        <Route path="/create" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
        <Route path="/listing/:id" element={<ProtectedRoute><ListingDetail /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      </Routes> 
    </div>
  );
}

export default App;

