import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, shipments }) => {
  const navigate = useNavigate();

  const handleNavigate = (shipment) => {
    navigate(`/shipment-details/${shipment.title}`, { state: shipment })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({shipments.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && shipments.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any package shipments yet
          </p>
        )}

        {!isLoading && shipments.length > 0 && shipments.map((shipment) => <FundCard 
          key={shipment.id}
          {...shipment}
          handleClick={() => handleNavigate(shipment)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns