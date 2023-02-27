import React from 'react';

import { user } from '../assets';

const FundCard = ({ owner, title, description, image, handleClick }) => {

  
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#edeef0] cursor-pointer" onClick={handleClick}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <p className="mt-[2px] font-epilogue font-medium text-[12px] text-[#333333]">Shipment ID</p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#333333] text-left leading-[18px] truncate">{description}</p>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={user} alt="user" className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#333333]">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard