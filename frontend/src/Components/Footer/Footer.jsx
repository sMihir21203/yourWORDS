import React from 'react'
import { Button, Menu } from '../CompsIndex.js'
import { FaFacebookF, FaGithub} from 'react-icons/fa'
import { AiFillMail } from 'react-icons/ai'


const Footer = () => {
  return (
    <footer className="w-full footer footer-horizontal footer-center shadow-[-0px_-7px_7px_-11px] shadow-base-content p-6">
      <div className='flex flex-wrap justify-center'>
        <Menu
          makeActive="no"
          links={[
            { name: "About Us", path: "/about-us" },
            { name: "Term & Conditions", path: "/terms-and-conditions" },
            { name: "Privacy Policy", path: '/privacy-policy' },
            { name: "Contact Us", path: '/contact-us' }
          ]}
        />
      </div>
      <div className='lg:flex lg:flex-row-reverse lg:gap-x-[55rem] shadow-[-0px_-7px_7px_-11px] shadow-base-content p-4 space-y-2'>
        <div className="flex flex-wrap gap-4">
          <a href='mailto:yourword.project@gmail.com'>
            <Button icon={AiFillMail} iconSize={25} />
          </a>
          <a
            target='_blank'
            href="https://github.com/sMihir21203/yourWORDS">
            <Button icon={FaGithub} iconSize={25} />
          </a>
          <a href='/contact-us'>
            <Button icon={FaFacebookF} iconSize={25} />
          </a>
        </div>
        <div>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by <span className='font-bold' >YourWORDS</span> Ltd</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer