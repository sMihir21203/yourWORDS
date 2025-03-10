import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { Button, SignOutBtn } from "../../Components/CompsIndex.js";
import { FaAngleDoubleRight } from 'react-icons/fa';

const Sidebar = () => {
  const currentUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser);

  const [tab, setTab] = useState("");
  const location = useLocation();

  // activeLink function that considers both pathname and search (query params)
  const activeLink = (path) => {
    return location.search === path
      ? "w-85 lg:w-60 h-9 text-lg py-1 font-semibold shadow shadow-accent-content rounded-md border-none"
      : "w-85 lg:w-60 h-9 text-lg py-1 hover:bg-base-100 rounded-md";
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <>
      {/* siderBar for largeScreen */}
      <div className='hidden lg:inline'>
        <div className={`w-full min-h-screen sticky bg-base-300 p-4`}>
          <ul className='menu pt-24 text-center space-y-4'>
            <div>
              <img className='w-20 h-20 rounded-full mx-auto' src={currentUser?.avatar} alt="" />
              <p className='font-semibold'>@<span>{currentUser.username}</span></p>
            </div>
            <ul className='space-y-2 mx-auto'>
              <li>
                <Link
                  to="/dashboard?tab=profile"
                  className={`${activeLink("?tab=profile")} text-center justify-center`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=post"
                  className={`${activeLink("?tab=post")} text-center justify-center`}>
                  Home
                </Link>
              </li>
            </ul>
            <SignOutBtn className='w-60'/>
          </ul>
        </div>
      </div>

      {/* sideBar sm and md Screens */}
      <div className='lg:hidden'>
        <div className='fixed mt-24 left-4 dropdown dropdown-right z-10'>
          <Button
            tabIndex={0}
            role='button'
            icon={FaAngleDoubleRight}
          />
          <ul className="dropdown-content menu bg-base-300 rounded-box  w-[23rem] p-2 ml-2 shadow-sm text-center space-y-4">
            <div>
              <img className='w-20 h-20 rounded-full mx-auto' src={currentUser?.avatar} alt="" />
              <p className='font-semibold'>@<span>{currentUser.username}</span></p>
            </div>
            <ul className='space-y-2 mx-auto'>
              <li>
                <Link
                  to="/dashboard?tab=profile"
                  className={`${activeLink("?tab=profile")} text-center justify-center`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=post"
                  className={`${activeLink("?tab=post")} text-center justify-center`}>
                  Home
                </Link>
              </li>
            </ul>

            <SignOutBtn className='w-80'/>

          </ul>



        </div>
      </div>
    </>
  );
};

export default Sidebar; 