import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, sun } from '../assets';
import { navlinks } from '../constants';
import "./index.css"

// If isActive is equal to name, then the bg-[#ffffff] class is added to the div element, 
// which changes its background color to white. If disabled is falsy, 
// then the cursor-pointer class is added to the div element, which sets the cursor to pointer when hovered.

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#ffffff]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="side_logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="side_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] glass" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center glass rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#ededf5]" imgUrl={sun} />
      </div>
    </div>
  )
}

export default Sidebar