import React from 'react'
import { Container } from '../Components/CompsIndex.js'
import { FaFacebookF, FaGithub, FaPhone } from 'react-icons/fa'
import { AiFillMail } from 'react-icons/ai'

const ContactUs = () => {
    return (
        <Container>
            <div className='flex flex-col items-center gap-8 text-lg mb-32'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl self-center justify-self-center mb-2 shadow-xs shadow-base-content w-fit p-2 rounded-md text-center'>Contact YourWORDS</h1>
                </div>
                <div className='space-y-6 flex flex-col items-center'>
                    <div>
                        <h1 className='font-bold md:text-2xl self-center justify-self-center p-2'>Have a Question?</h1>
                        <p>Reach out to us — we’re always happy to chat!</p>
                    </div>
                    <div className='flex flex-col md:flex-row justify-center gap-12'>
                        <div className='flex flex-col items-center text-center space-y-4'>
                            <a 
                            href='mailto:yourword.project@gmail.com'
                            className='rounded-full shadow-xs shadow-base-content p-2'>
                                <AiFillMail size={35} />
                            </a>
                            <div className='space-y-1'>
                                <p className='font-bold text-xl'>Email</p>
                                <p className='text-sm opacity-70'>Send us your feedback</p>
                                <p className='text-sm'>yourword.project@gmail.com</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center text-center space-y-4'>
                            <a
                            href="tel:+919898187922" 
                            className='rounded-full shadow-xs shadow-base-content p-2'>
                                <FaPhone size={35} />
                            </a>
                            <div className='space-y-1'>
                                <p className='font-bold text-xl'>Phone</p>
                                <p className='text-sm opacity-70'>Give us a call
                                </p>
                                <p className='text-sm'>+91 98XXXX7922</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center text-center space-y-4'>
                            <a
                            href='/contact-us' 
                            className='rounded-full shadow-xs shadow-base-content p-2'>
                                <FaFacebookF size={35} />
                            </a>
                            <div className='space-y-1'>
                                <p className='font-bold text-xl'>Facebook</p>
                                <p className='text-sm opacity-70'>Follow us on Facebook</p>
                                <p className='text-sm'>Comming soon</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center text-center space-y-4'>
                            <a
                            target='_blank' 
                            href="https://github.com/sMihir21203/yourWORDS" className='rounded-full shadow-xs shadow-base-content p-2'>
                                <FaGithub size={35} />
                            </a>
                            <div className='space-y-1'>
                                <p className='font-bold text-xl'>GitHub</p>
                                <p className='text-sm opacity-70'>See our updates at GitHub</p>
                                <p className='text-sm'>YourWORDS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ContactUs