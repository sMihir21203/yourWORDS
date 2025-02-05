import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaAlignLeft } from "react-icons/fa";

const Header = () => {
  
  // activeLink
  const location = useLocation();
  const liveLink = (path) => {
    return location.pathname === path
      ? "font-bold border-b-2 bg-gradient-to-r from-pink-600 to-blue-600 text-transparent bg-clip-text border-pink-600 border-b-[3px]"
      : "hover:bg-gradient-to-r from-pink-600 to-blue-600 hover:text-transparent hover:bg-clip-text hover:border-pink-600 hover:border-b-[3px]";
  };
  
  return (
    <>
      <div className='navbar bg-base-100 shadow-md p-4'>
        {/* logo */}
        <div className='flex-1 '>
          <Link
            to='/'
            className='ml-2 md:ml-12  self-center whitespace-nowrap text-2xl sm:text-3xl font-extrabold dark:text-white'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-l-lg text-white font-semibold'>
              Your
            </span>
            WORDS
          </Link>
        </div>
        {/* searchBar */}
        <div className='mr-40 hidden lg:inline'>
          <form className='max-w-fit flex items-center border-1 rounded-2xl p-2 m-0 bg-base-200'>
            <input
              type='text'
              placeholder='FIND your READ...'
              className='border-0 outline-0 text-md  w-70'
            />
            <AiOutlineSearch size={30} className='cursor-pointer' />
          </form>
        </div>
        {/* SearchBtn in Small Screen*/}
        <div className='lg:hidden'>
          <button className='btn w-12 h-10 mr-1 p-1 rounded-2xl border-3'>
            <AiOutlineSearch size={25} />
          </button>
        </div>
        {/* Menu For largeScreen */}
        <div className='mr-32 hidden lg:inline'>
          <ul className='text-xl space-x-4 text-md'>
            <Link className={liveLink("/")} to='/'>
              Home
            </Link>
            <Link className={liveLink('/about')} to='/about'>
              About
            </Link>
            <Link className={liveLink('/portfolio')} to='/portfolio'>
              Portfolio
            </Link>
          </ul>
        </div>
        {/* themeBtn, signInBtn & dropDownMenu */}
        <div className='flex gap-1 mr-2 md:mr-8'>
          {/* themeBtn */}
          <button className='btn h-10 border-3 rounded-2xl'>
            <FaMoon size={20} />
          </button>
          {/* SignInBtn */}
          <Link to='/sign-in' >
            <button  className='btn w-20 h-10 p-1 border-3 font-extrabold text-white bg-gradient-to-r from-pink-600 to-blue-600 rounded-lg hover:text-transparent hover:bg-clip-text'>
              Sign In
            </button>
          </Link>
          {/* dropDownMenu For smallScreen */}
        <div className='dropdown  dropdown-bottom dropdown-end lg:hidden '>
          <div
            tabIndex={0}
            role='button'
            className='btn p-2 rounded-lg border-3'
          >
            <FaAlignLeft size={25} />
          </div>
          <li className='dropdown-content menu bg-base-100 rounded-lg w-40 p-8 shadow-lg space-y-3 items-center'>
            <Link className={liveLink('/')} to='/'>
              Home
            </Link>
            <Link className={liveLink('/about')} to='/about'>
              About
            </Link>
            <Link
              className={liveLink('/portfolio')}
              to='/portfolio'
            >
              Portfolio
            </Link>
          </li>
        </div>
        </div>
      </div>
    </>
  );
};

export default Header;
