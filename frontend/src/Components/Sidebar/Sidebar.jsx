import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, SignOutBtn } from "../CompsIndex.js";
import { FaAngleDoubleRight, FaUser, FaRegNewspaper, FaPen, FaUsers, FaComment, FaSlidersH } from 'react-icons/fa';

const Sidebar = () => {
  const currentUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser);
  const admin = useSelector(state => state?.user?.currentUser?.data?.admin)

  const [tab, setTab] = useState("");
  const location = useLocation();

  const activeLink = (path) => {
    return location.search === path
      ? "w-full h-10 md:text-lg pl-8 md:pl-16 font-semibold shadow shadow-base-content rounded-md border-none"
      : "w-full h-10 md:text-lg hover:bg-base-100 rounded-md";
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

      <div className={`fixed  mt-18 md:mt-21 left-4 dropdown dropdown-right z-10`}>
        <div
          className='tooltip tooltip-right text-lg font-semibold'
          data-tip="Open Sidebar"
        >
          <Button
            tabIndex={0}
            role='button'
            icon={FaAngleDoubleRight}
            className='bg-base-100'
          />
        </div>
        <ul className="dropdown-content w-52 md:w-sm menu p-4 bg-base-300 rounded-box shadow-sm space-y-4 text-nowrap">
          <p className='font-bold text-xl'>
            @{currentUser.username}
          </p>
          <ul className='space-y-2'>
            <li>
              <Link

                to="/dashboard?tab=profile"
                className={`${activeLink("?tab=profile")} flex items-center justify-between`}>
                <span className='flex items-center gap-2'><FaUser />  Profile</span> <span>{admin ? "Admin" : "User"}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=dash"
                className={`${activeLink("?tab=dash")}`}>
                <FaSlidersH />  Dashboard
              </Link>
            </li>
            {/* onlyAdmin Access */}
            {admin && (
              <>
                <li>
                  <Link
                    to="/dashboard?tab=admin-dash"
                    className={`${activeLink("?tab=admin-dash")}`}>
                    <FaSlidersH />  Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard?tab=all-users"
                    className={`${activeLink("?tab=all-users")}`}>
                    <FaUsers />  All Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard?tab=all-posts"
                    className={`${activeLink("?tab=all-posts")}`}>
                    <FaRegNewspaper />  All Posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard?tab=all-comments"
                    className={`${activeLink("?tab=all-comments")}`}>
                    <FaComment />  All Comments
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/dashboard?tab=share-words"
                className={`${activeLink("?tab=share-words")}`}>
                <FaPen />  Share WORDS
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
                to="/dashboard?tab=comments"
                className={`${activeLink("?tab=comments")}`}>
                <FaComment />  Comments
              </Link>
            </li>
          </ul>
          <SignOutBtn className='w-full' />
        </ul>
      </div >
    </>
  );
};

export default Sidebar; 