import React, { useState, useEffect } from 'react'

import { DisplayShipments } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shipments, setCampaigns] = useState([]);

  const { address, contract, getUserShipments } = useStateContext();

  const fetchShipments = async () => {
    setIsLoading(true);
    const data = await getUserShipments();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchShipments();
  }, [address, contract]);

  return (
    <DisplayShipments 
      title="All Campaigns"
      isLoading={isLoading}
      shipments={shipments}
    />
  )
}

export default Profile