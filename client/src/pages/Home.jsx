import React, { useState, useEffect } from 'react'

import { DisplayShipments } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shipments, setShipments] = useState([]);

  const { address, contract, getUserShipments } = useStateContext();

  const fetchShipments = async () => {
    setIsLoading(true);
    const data = await getUserShipments();
    setShipments(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchShipments();
  }, [address, contract]);

  return (
    <DisplayShipments 
      title="All Shipments"
      isLoading={isLoading}
      shipments={shipments}
    />
  )
}

export default Home