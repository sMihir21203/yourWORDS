import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, SignOutBtn } from "../../../Components/CompsIndex.js";
import { FaAngleDoubleRight, FaUser, FaRegNewspaper, FaPen, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
  const currentUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser);
  const admin = useSelector(state => state?.user?.currentUser?.data?.admin)

  const [tab, setTab] = useState("");
  const location = useLocation();

  // activeLink function that considers both pathname and search (query params)
  const activeLink = (path) => {
    return location.search === path
      ? "w-50 lg:w-60 h-9 text-lg py-1 pl-12 font-semibold shadow shadow-base-content rounded-md border-none"
      : "w-50 lg:w-60 h-9 text-lg py-1 hover:bg-base-100 rounded-md";
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
      <div className='hidden md:inline'>
        <div className={`w-fit  min-h-full sticky bg-base-300 p-4`}>
          <ul className='menu pt-24 text-center space-y-4'>
            <div>
              <img className='w-20 h-20 rounded-full mx-auto' src={currentUser?.avatar} alt="" />
              <p className='font-semibold'>@<span>{currentUser.username}</span></p>
            </div>
            <ul className='space-y-2 mx-auto'>
              <li>
                <Link

                  to="/dashboard?tab=profile"
                  className={`${activeLink("?tab=profile")}`}>
                  <FaUser />  Profile <span className='-mr-2 py-1 px-1.5 rounded-lg text-sm font-bold bg-base-100'>{admin ? "Admin" : "User"}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=my-posts"
                  className={`${activeLink("?tab=my-posts")}`}>
                  <FaRegNewspaper /> My Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=create-post"
                  className={`${activeLink("?tab=create-post")}`}>
                  <FaPen />  Create Post
                </Link>
              </li>

              {/* onlyAdmin Access */}
              {admin && (
                <li>
                  <Link
                    to="/dashboard?tab=users"
                    className={`${activeLink("?tab=users")}`}>
                    <FaUsers />  Users
                  </Link>
                </li>
              )}

            </ul>
            <SignOutBtn className='w-50 lg:w-60' />
          </ul>
        </div>
      </div>

      {/* sideBar sm and md Screens */}
      <div className='md:hidden'>
        <div className='fixed mt-24 left-4 dropdown dropdown-right z-10'>
          <Button
            tabIndex={0}
            role='button'
            icon={FaAngleDoubleRight}
          />
          <ul className="dropdown-content menu bg-base-300 rounded-box  w-[20rem] p-2 ml-2 shadow-sm text-center space-y-4">
            <div>
              <img className='w-20 h-20 rounded-full mx-auto' src={currentUser?.avatar} alt="" />
              <p className='font-semibold'>@<span>{currentUser.username}</span></p>
            </div>
            <ul className='space-y-2 mx-auto'>
              <li>
                <Link

                  to="/dashboard?tab=profile"
                  className={`${activeLink("?tab=profile")}`}>
                  <FaUser />  Profile <span className='-mr-2 py-1 px-1.5 rounded-lg text-sm font-bold bg-base-100'>{admin ? "Admin" : "User"}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=my-posts"
                  className={`${activeLink("?tab=my-posts")}`}>
                  <FaRegNewspaper /> My Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=create-post"
                  className={`${activeLink("?tab=create-post")}`}>
                  <FaPen />  Create Post
                </Link>
              </li>

              {/* onlyAdmin Access */}
              {admin && (
                <li>
                  <Link
                    to="/dashboard?tab=users"
                    className={`${activeLink("?tab=users")}`}>
                    <FaUsers />  Users
                  </Link>
                </li>
              )}

            </ul>
            <SignOutBtn className='' />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 