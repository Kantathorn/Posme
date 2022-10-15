import './App.css';
import React from 'react'
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Cashier from './pages/Cashier'
import Users from './pages/Users'
import Items from './pages/Items'
import Reports from './pages/Report'
import Login from './pages/Login'
import Title from './components/title'
import Register from './pages/Register'
import EditProfile from './pages/EditUser/EditProfile'

function App() {
  return (
    <Browser>
        <Routes>
          <Route path="*" element={<Title />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/store/home" element={<Home />} />
          <Route path="/store/cashier" element={<Cashier />} />
          <Route path="/store/items" element={<Items />} />
          <Route path="/store/reports" element={<Reports />} />
          <Route path="/store/users" element={<Users />} />
          <Route path="/store/users/edit_profile" element={<EditProfile />} />
        </Routes>
      </Browser>
  );
}

export default App;
