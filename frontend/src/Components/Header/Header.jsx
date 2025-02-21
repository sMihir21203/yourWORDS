import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineSelect } from "react-icons/ai";
import { FaMoon, FaSun, FaListUl } from "react-icons/fa";
import { Button, Logo, Menu } from "../CompsIndex.js"
import { useDispatch, useSelector } from "react-redux"
import { toggleThemeBtn } from '../../Store/Theme/themeSlice.js'


const Header = () => {

  const currentUser = useSelector(state => state.user?.currentUser?.data?.user);
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.theme)

  // console.log(currentUser?.avatar)
  // console.log(theme)
  const Radhe = () => {
    alert("Radhe Radhe")
  }

  return (
    <>
      <div className='navbar fixed top-0 left-0 right-0 z-10 bg-base-100 shadow-md p-4 '>
        {/* logo */}
        <div className='flex-1 '>
          <Logo className="md:ml-12" />
        </div>

        {/* searchBar */}
        <div className='mr-20 hidden lg:inline'>
          <form className='max-w-fit flex items-center input input-secondary rounded-2xl p-2 m-0 h-12 bg-base-200 '>
            <input
              placeholder='FIND your READ...'
              className='border-0 outline-0 text-md  w-70 '
            />
            <AiOutlineSearch size={30} className='cursor-pointer text-pink-600 ' onClick={Radhe} />
          </form>
        </div>

        {/* Menu For largeScreen */}
        <div className='mr-20 hidden lg:inline'>
          <ul className='text-xl space-x-4 text-md'>
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
        <div className='flex gap-1 mr-2 md:mr-12 items-center'>
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
            <div className="dropdown dropdown-bottom dropdown-end ">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar h-12 w-12 m-1">
                <div className="rounded-full">
                  <img
                
                    src={currentUser.avatar} alt="avatar"
                  />
                </div>
              </div>
              <ul className="menu dropdown-content bg-base-100 rounded-lg w-48 p-6 shadow-2xl gap-y-1 place-items-start ">
                <span className="font-bold mb-2">@{currentUser.username}</span>
                <Menu
                  links={[
                    { name: "Dashboard", path: "/dashboard?tab=profile" }
                  ]}
                />
                <Button className="w-24 h-5 p-0" iconSize={15} text={"SignOut"} icon={AiOutlineSelect} />
              </ul>
            </div>) : (
            <Link to='/sign_in' >
              <Button className="h-9" text={"Sign In"} style="gradient" onClick={Radhe} />
            </Link>)
          }


          {/* SM:dropDownMenu */}
          <div className='dropdown dropdown-bottom dropdown-end lg:hidden '>
            <FaListUl
              tabIndex={0}
              role='button'
              className='btn p-2 rounded-lg border-3 w-10 h-9'
            />

            <ul className="menu dropdown-content mt-2 bg-base-100 rounded-lg w-24 p-6 shadow-2xl gap-y-2 place-items-start">
              <Menu
                links={[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Portfolio", path: "/portfolio" }
                ]}
              />
              <Button
                className="md:hidden inline pl-2"
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
