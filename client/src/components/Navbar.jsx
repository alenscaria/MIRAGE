import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, user } from '../assets';
import { navlinks } from '../constants';

//isActive: a string that keeps track of the currently active navigation link.
//toggleDrawer: a boolean value that toggles the visibility of the navigation menu on small screens.
//uses the useStateContext hook from the application context to get the current wallet address and the connect function to connect to a wallet.

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#ededf5] rounded-[100px]">
        <input type="text" placeholder="Search for shipments" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#989ea6] text-black bg-transparent outline-none" />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>

        {/* LOGO & NAME */}
      <div className='flex'>
        <img src={logo} className="h-10 ml-3 mt-1"></img>
        <div className='ml-3 mt-3'>
          <p className='font-link text-xl text-[#1a7a4c]'> M I R A G E</p>
        </div>
      </div>



      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? 'Create new shipment' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#7952b3]'}
          handleClick={() => {
            if (address) navigate('create-shipment')
            else connect()
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#e9e9ef] flex justify-center items-center cursor-pointer">
            <img src={user} alt="user" className="w-[100%] h-[100%] object-contain" />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#e9e9ef] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="logo" className="w-[60%] h-[60%] object-contain" />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-[#e9e9ef] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#c9c9d8]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? 'Create new shipment' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#7952b3]'}
              handleClick={() => {
                if (address) navigate('create-shipment')
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar