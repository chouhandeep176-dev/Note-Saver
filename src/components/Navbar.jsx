import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-auto h-auto">
      <ul className="w-full h-full flex gap-2">
        <li className="w-auto h-auto">
          <NavLink
            className={
              "px-3 py-1 border-1 border-gray-500 rounded-md font-light hover:bg-gray-700 active:bg-gray-700 "
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>

        <li className="w-auto h-auto ">
          <NavLink
            className={
              "px-3 py-1 border-1 border-gray-500 rounded-md font-light hover:bg-gray-700 active:bg-gray-700 "
            }
            to={"/notes"}
          >
            Notes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
