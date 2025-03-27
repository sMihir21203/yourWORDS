import React from 'react'
import { Button, Logo, Menu } from '../CompsIndex.js'
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'


const Footer = () => {
  return (

    <footer className="footer footer-horizontal p-6 items-center shadow-[-0px_-7px_7px_-9px] shadow-base-content">

      <div className="grid-flow-col items-center lg:pl-8">
        <p>Copyright © {new Date().getFullYear()} - All right reserved by <span className='font-bold' >YourWORDS</span> Ltd</p>
      </div>

      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end lg:pr-8">
        <Button icon={FaLinkedinIn} iconSize={25} className='border-none hover:bg-gradient-to-r hover:from-[#0077b5] hover:to-[#004182] hover:text-white' />

        <Button icon={FaYoutube} iconSize={25} className='border-none hover:bg-gradient-to-r hover:from-[#ff0000] hover:to-[#cc0000] hover:text-white' />
        

        <Button icon={FaInstagram} iconSize={25} className='border-none hover:bg-gradient-to-r  hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white' />
      </div>
    </footer>
  )
}

export default Footer