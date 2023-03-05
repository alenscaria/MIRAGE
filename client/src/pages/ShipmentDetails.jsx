import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Stepper from "../components/Stepper";
import { useStateContext } from '../context';
import { CustomButton, Loader } from '../components';
import { user } from '../assets';

const ShipmentDetails = () => {
  const { state } = useLocation();
  const { contract, address } = useStateContext();


  return (
    <div className='effect'>
      {/* {isLoading && <Loader />} */}

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

      <div className="p-10 mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black underline">User Details</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={user} alt="user" className="w-[100%] h-[100%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-black break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#333333]">Sender</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black underline">Shipment Details</h4>
          </div>

          <div>
            <p className="font-epilogue font-semibold text-[16px] text-black">Title</p>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">{state.title}</p>
              </div>
          </div>
          <div>
            <p className="font-epilogue font-semibold text-[16px] text-black">Category</p>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">{state.category}</p>
              </div>
          </div>



          <div>
            <p className="font-epilogue font-semibold text-[16px] text-black">Description</p>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#333333] leading-[26px] text-justify">{state.description}</p>
              </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[16px] text-black">Common Documents</h4>

              <a href={state.commonDocuments}>
                <div className="mt-[15px] flex flex-col gap-4 text-[#3285d2] hover:text-[#024787]">
                  {state.commonDocuments}
                </div>
              </a>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[16px] text-black">Confidential Documents</h4>

              <a href={state.confidentialDocuments}>
                <div className="mt-[15px] flex flex-col gap-4 text-[#3285d2] hover:text-[#024787]">
                  {state.confidentialDocuments}
                </div>
              </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShipmentDetails