import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun, FaListUl } from "react-icons/fa";
import { Button, Logo, Menu, SignOutBtn } from "../CompsIndex.js"
import { useDispatch, useSelector } from "react-redux"
import { toggleThemeBtn } from '../../Store/Theme/themeSlice.js'


const Header = () => {

  const currentUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser);
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.theme)
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");

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
      <div className='navbar fixed top-0 left-0 right-0 z-10 bg-base-100 shadow-md p-2 items-center'>
        {/* logo */}
        <div className='flex-1 '>
          <Logo className="md:ml-12 " />
        </div>

        {/* searchBar */}
        <div className='mr-14 hidden lg:inline'>
          <form className='max-w-fit flex items-center input input-secondary rounded-2xl h-12 bg-base-200 '>
            <input
              placeholder='FIND your READ...'
              className='border-0 outline-0 text-md  w-70 '
            />
            <AiOutlineSearch size={30} className='cursor-pointer text-[#ff007f] ' onClick={Radhe} />
          </form>
        </div>

        {/* Menu For largeScreen */}
        <div className='mr-16 hidden lg:inline'>
          <ul className='text-lg space-x-2'>
            <Menu
              links={[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Portfolio", path: "/portfolio" }
              ]}
            />
          </ul>
        </div>

        {/* SM:searchBtn , 
            themeBtn, 
            signInBtn &
            SM:dropDownMenu 
        */}
        <div className='flex gap-2 mr-4 mt-1.5 md:mr-12 '>
          {/* SM:searchBtn */}
          <div className='lg:hidden'>
            <Button icon={AiOutlineSearch} iconSize={25} onClick={Radhe} />
          </div>

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
              <ul className="menu dropdown-content bg-base-100 shadow-md shadow-accent-content rounded-lg max-w-auto p-4 mt-1 gap-y-2  place-items-center">
                <p className="font-bold mb-2">@{username}</p>
                <Menu
                  links={[
                    { name: "Profile", path: "/dashboard?tab=profile" }
                  ]}
                />
                <SignOutBtn/>
              </ul>
            </div>) : (
            <Link to='/sign-in' >
              <Button
                text="Sign In"
                style="gradient"
                className="h-10 md:pb-1 -mt-1 md:px-4"
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
            <ul className="menu dropdown-content mt-1 bg-base-100 shadow-md shadow-accent-content rounded-lg w-24 p-6 gap-y-2 place-items-start">
              <Menu
                links={[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Portfolio", path: "/portfolio" }
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
    </>
  );
};

export default Header;
