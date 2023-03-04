import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "./index.css"
import { Sidebar, Navbar } from './components';
import { ShipmentDetails, CreateCampaign, Home, Profile } from './pages';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-gradient-to-b from-gray-900 to-slate-700 min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-shipment" element={<CreateCampaign />} />
          <Route path="/shipment-details/:id" element={<ShipmentDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App