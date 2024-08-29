import React, { useState } from 'react';

import { BiSolidDashboard } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoLogoReact } from "react-icons/io5";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("");

  const menus = [
    { name: 'Dashboard', icon: BiSolidDashboard },
    { name: 'Settings', icon: IoSettingsSharp },
    { name: 'Logout', icon: RiLogoutBoxRLine },
  ];

  return (
    <div className="flex flex-col gap-y-4 items-center py-8 w-24 bg-gray-900">
      <button className="p-2 bg-opacity-20 rounded-xl bg-primary">
        {/* <StoreIcon /> */}
        <IoLogoReact className='text-white w-10 h-14'/>
      </button>
      <div className="flex flex-col gap-y-4 items-end self-end">
        {menus.map((menu) => (
          <div
            key={menu.name}
            className={`${
              activeMenu === menu.name
                ? 'bg-gray-800 rounded-l-xl relative before:absolute before:w-4 before:h-8 before:-top-8 before:rounded-br-xl before:right-0 before:shadow-inverse-top after:absolute after:w-4 after:h-8 after:-bottom-8 after:rounded-tr-xl after:right-0 after:shadow-inverse-bottom'
                : ''
            }`}
          >
            <button
              className={`p-4 my-4 mr-4 ml-3 rounded-xl ${
                activeMenu === menu.name
                  ? 'text-white shadow-primary bg-primary'
                  : 'text-primary text-white'
              }`}
              onClick={() => setActiveMenu(menu.name)}
            >
              <menu.icon className="w-6 h-6 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
