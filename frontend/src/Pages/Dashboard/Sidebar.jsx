import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from "../../Components/CompsIndex.js";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { AiOutlineLogout, AiOutlineSelect } from 'react-icons/ai';

const Sidebar = () => {
  const currentUser = useSelector(state => state.user?.currentUser?.data?.user);

  const [tab, setTab] = useState("");
  const location = useLocation();

  // activeLink function that considers both pathname and search (query params)
  const activeLink = (path) => {
    return location.search === path
      ? "w-60 font-bold border-b-2 border-pink-600 border-b-[3px] rounded-xl text-xl"
      : "w-60 font-semibold hover:text-pink-500 hover:bg-base-100  rounded-xl ";
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const [show, setShow] = useState(false);

  return (
    <>
      {!show && (
        <div className='mt-24 sm:hidden fixed top-0 left-2'>
          <Button
            icon={FaAngleDoubleRight}
            onClick={() => setShow(true)}
          />
        </div>
      )}
      <div className={`md:w-full h-full md:min-h-screen fixed md:sticky bg-base-300 top-0 left-0 sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"} p-4`}>
        <div className="mt-24 sm:hidden absolute top-0 right-2">
          <Button
            icon={FaAngleDoubleLeft}
            onClick={() => setShow(false)} />
        </div>
        <ul className='pt-20 text-center'>
          <img className='w-20 h-20 rounded-full mx-auto' src={currentUser?.avatar} alt="" />
          <p className='font-semibold'>@<span>{currentUser.username}</span></p>
          <li className='pt-8 flex flex-col gap-y-2'>
            <Link
              to="/dashboard?tab=profile"
              className={`${activeLink("?tab=profile")}`}>
              Profile 
            </Link>
            <Link
              to="/dashboard?tab=post"
              className={`${activeLink("?tab=post")}`}>
              Home
            </Link>
            <Link
              to="/dashboard?tab=logout"
              className="flex gap-x-1 text-center justify-center text-md rounded-xl font-semibold btn btn-dash btn-secondary border-2">
              <AiOutlineSelect size={25} />
              SignOut
            </Link>
          </li>

        </ul>
      </div>
    </>
  );
};

export default Sidebar;
