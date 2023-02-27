//Connect Button  +  used in Shipment-details +  submit button in Create-new-shipment form
//initially shows as connect & after connected to the wallet it will show as create-new-shipment

import React from 'react'

// btnType prop is a string that specifies the type of button (submit, reset, or button).
// title prop is a string that specifies the text to be displayed on the button. 
// handleClick prop is a function that will be called when the button is clicked. 
// The styles prop is a string that specifies any additional CSS styles to be applied to the button.

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