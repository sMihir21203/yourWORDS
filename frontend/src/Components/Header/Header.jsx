import React from "react";
import { Link} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaAlignLeft } from "react-icons/fa";
import { Button, Logo, Menu } from "../CompsIndex.js"


const Header = () => {

  const Radhe = () => {
    alert("Radhe Radhe")
  }

  return (
    <>
      <div className='navbar fixed top-0 left-0 right-0 z-10 bg-base-100 shadow-md p-4 '>
        {/* logo */}
        <div className='flex-1 '>
          <Logo />
        </div>

        {/* searchBar */}
        <div className='mr-20 hidden lg:inline'>
          <form className='max-w-fit flex items-center border-1 rounded-2xl p-2 m-0 bg-base-200 '>
            <input
              placeholder='FIND your READ...'
              className='border-0 outline-0 text-md  w-70 '
            />
            <AiOutlineSearch size={30} className='cursor-pointer' onClick={Radhe} />
          </form>
        </div>

        {/* Menu For largeScreen */}
        <div className='mr-20 hidden lg:inline'>
          <ul className='text-xl space-x-4 text-md'>
            <Menu />
          </ul>
        </div>

        {/* SM:searchBtn , 
            themeBtn, 
            signInBtn &
            SM:dropDownMenu 
        */}
        <div className='flex gap-1 mr-2 md:mr-12 items-center'>
          {/* SM:searchBtn */}
          <div className='lg:hidden'>
            <Button icon={AiOutlineSearch} iconSize={25} onClick={Radhe} />
          </div>

          {/* themeBtn */}
          <Button icon={FaMoon} onClick={Radhe} />

          {/* SignInBtn */}
          <Link to='/sign-in' >
            <Button className="h-11" text={"Sign In"} style="gradient" onClick={Radhe} />
          </Link>

          {/* SM:dropDownMenu */}
          <div className='dropdown  dropdown-bottom dropdown-end lg:hidden '>
            <div
              tabIndex={0}
              role='button'
              className='btn p-2 rounded-lg border-3'
            >
              <FaAlignLeft size={25} />
            </div>
            <ul className="dropdown-content menu bg-base-100 rounded-lg w-32 p-6 shadow-lg space-y-5 items-center">
              <Menu />
            </ul>

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
