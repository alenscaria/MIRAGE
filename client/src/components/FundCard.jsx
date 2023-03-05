import React from 'react';
import { user } from '../assets';
import "./index.css";

const FundCard = ({ owner, title, category, sender, logistics, receiver, description, image, handleClick }) => {

  
  return (
    <div className="sm:w-[288px] w-full rounded-t-lg-[10px] bg-[#edeef0] cursor-pointer effect" onClick={handleClick}>
      <img src={image} alt="product image" className="w-full h-[158px] object-cover rounded-t-[15px]"/>

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <p className="mt-[2px] font-epilogue font-medium text-[12px] text-[#333333]">{category}</p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">
          {title}
        </h3>
        <p className="mt-[5px] font-epilogue font-normal text-[#333333] text-left leading-[18px] truncate">
          {description}
        </p>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center">
            <img src={user} alt="user" className="w-100% h-100% object-contain"/>
          </div>
          
          <div className='justify-center items-center truncate'>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            By <span className="text-[#333333]">{owner}</span>
          </p>

         {/* <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            Carried By <span className="text-[#333333]">{logistics}</span>
  </p> */}

          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            To <span className="text-[#333333]">{receiver}</span>
          </p>

        </div>

        </div>
      </div>
    </div>
  )
}

export default FundCard