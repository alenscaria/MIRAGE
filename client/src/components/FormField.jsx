import React from 'react'

// labelName: A string that represents the label for the form field.
// placeholder: A string that represents the placeholder text for the form field.
// inputType: A string that represents the type of the input field (e.g., "text", "email", "number").
// isTextArea: A boolean that indicates whether the form field should be a textarea element or an input element.
// value: The current value of the form field.
// handleChange: A function that will be called whenever the value of the form field changes.

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName /* label is rendered only if labelName is provided. */ && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#ffffff] mb-[10px]">{labelName}</span>
      )}
      {isTextArea ? (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#aab1b9] bg-transparent font-epilogue text-[#333333] text-[14px] placeholder:text-[#aab1b9] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1" /*  used to allow values to be entered to one decimal place */
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#aab1b9] bg-transparent font-epilogue text-[#ffffff] text-[14px] placeholder:text-[#aab1b9] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  )
}

export default FormField