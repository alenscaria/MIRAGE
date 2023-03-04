import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Stepper from "../components/Stepper";
import { useStateContext } from '../context';
import { CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { user } from '../assets';

const ShipmentDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount); 

    navigate('/')
    setIsLoading(false);
  }

  return (
    <div className='effect'>
      {isLoading && <Loader />}
<div>
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="shipment" className="w-full h-[410px] object-cover rounded-xl"/>

                            {/* Progress Tracking */}
        <div className="flex-1 mt-3">

<div className="flex flex-col gap-10 pt-11 items-center justify-center">
  <Stepper />
</div>

</div>


        </div>
      </div>

      <div className="p-10 mt-[2px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold underline text-[18px] text-[#333333]">User Details</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={user} alt="user" className="w-[100%] h-[100%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-[#333333] break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#333333]">Sender</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] underline text-[#333333]">Shipment Details</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">{state.title}</p>
              </div>
          </div>

          <div>
          <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">{state.description}</p>
          </div>

          <div>
          <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">Sender Verified : 10:00AM  , 26- Feb -2023 </p>
          <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">Shipped Date : 09:30AM   , 27- Feb -2023 </p>
          <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">Logistics Verified : -</p>
          <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">Receiver Verified : - </p>
          </div>


          <div>
          <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">Common Documents : URL </p>
          <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">Confidential Documents : URL </p>
          </div>


        </div>
      </div>
    </div>
    </div>
  )
}

export default ShipmentDetails