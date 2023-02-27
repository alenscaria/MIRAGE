//Button at top right near to the profile pic icon +  used in Shipment-details + used as submit button in Create-new-shipment form
//initially shows as connect & after connected to the wallet it will show as create-new-shipment

import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton