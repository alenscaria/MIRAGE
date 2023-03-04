import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';

import { loader } from '../assets';

const DisplayShipments = ({ title, isLoading, shipments }) => {
  const navigate = useNavigate(); // the useNavigate hook is used to get a navigation function to programmatically navigate to a new page in the application.


  // The handleNavigate function is defined to handle navigation to a specific shipment's details page when a user clicks on a shipment card.
  const handleNavigate = (shipment) => {
    navigate(`/shipment-details/${shipment.title}`, { state: shipment })
  }
  

  //conditionally renders a loading spinner or a message if there are no shipments
  //If there are shipments, it maps over them and renders a FundCard component for each one, passing in the shipment data as props and attaching the handleNavigate function as a click event listener.
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
          /* the key prop is used to give each rendered FundCard component a unique identifier. */
          key={shipment.id}
          /* the spread operator (...) is used to pass all the properties of the shipment object as props to the FundCard component. */
          {...shipment}
          handleClick={() => handleNavigate(shipment)}
        />)}
      </div>
    </div>
  )
}

export default DisplayShipments