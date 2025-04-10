import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaListUl } from "react-icons/fa";
import { Button, Logo, Menu, SignOutBtn } from "../CompsIndex.js"
import { useDispatch, useSelector } from "react-redux"
import { toggleThemeBtn } from '../../Store/Theme/themeSlice.js'


const Header = () => {
  const currentUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser);
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.theme)
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);
  const [errMsg, setErrMsg] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      setAvatar(currentUser.avatar),
        setUsername(currentUser.username)
    }
  }, [currentUser])

  // console.log(theme)
  const Radhe = () => {
    alert("Radhe Radhe")
  }

  return (
    <>
      <div className='navbar px-8 lg:px-14 bg-base-100 fixed top-0 left-0 right-0 z-10  shadow-[-0px_7px_7px_-11px] shadow-base-content flex items-center justify-between'>
        {/* logo */}
        <div className='flex-1'>
          <Logo />
        </div>

        <div className="lg:flex-1 flex items-center justify-between">
          {/* Menu For largeScreen */}
          <div className='hidden lg:inline'>
            <ul className='text-lg space-x-2'>
              <Menu
                links={[
                  { name: "Home", path: "/" },
                  { name: "About Us", path: "/about-us" },
                  { name: "ShareWORDS", path: '/dashboard?tab=share-words' }
                ]}
              />
            </ul>
          </div>

          {/*   
            themeBtn, 
            signInBtn &
            SM:dropDownMenu 
        */}
          <div className='flex gap-2 mt-1.5'>

            {/* themeBtn largeScreen */}
            <Button
              className="hidden md:inline pl-2"
              onClick={() => dispatch(toggleThemeBtn())}
              icon={theme === "light" ? FaSun : FaMoon}
            />

            {/* SignInBtn */}
            {currentUser ? (

              <div
                className="dropdown dropdown-bottom dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-circle avatar -mt-2 h-12 w-12  border-none shadow hover:shadow-md shadow-base-content">
                  <div className="rounded-full">
                    <img
                      src={avatar} alt="avatar"
                    />
                  </div>
                </div>
                <ul className="menu dropdown-content bg-base-100 shadow-sm shadow-base-content rounded-lg max-w-auto p-4 mt-1 gap-y-2  place-items-center">
                  <p className="font-bold mb-2">@{username}</p>
                  <Menu
                    links={[
                      { name: "Profile", path: "/dashboard?tab=profile" }
                    ]}
                  />
                  <SignOutBtn />
                </ul>
              </div>) : (
              <Link to='/sign-in' >
                <Button
                  text="Sign In"
                  style="gradient"
                  className="h-9 md:pb-1  md:px-4"
                  onClick={Radhe}
                />
              </Link>)
            }


            {/* SM:dropDownMenu */}
            <div className='dropdown dropdown-bottom dropdown-end lg:hidden '>
              <Button
                tabIndex={0}
                role='button'
                icon={FaListUl}
              />
              <ul className="menu dropdown-content mt-1 bg-base-100 shadow-md shadow-base-content rounded-lg w-24 p-6 gap-y-2 place-items-start">
                <Menu
                  links={[
                    { name: "Home", path: "/" },
                    { name: "About Us", path: "/about-us" },
                    { name: "ShareWORDS", path: '/dashboard?tab=share-words' }
                  ]}
                />
                <Button
                  className="md:hidden inline ml-3 pl-2"
                  onClick={() => dispatch(toggleThemeBtn())}
                  icon={theme === "light" ? FaSun : FaMoon}
                />
              </ul>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
