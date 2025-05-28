import React from 'react'
import { Container, PageTitle } from '../Components/CompsIndex.js'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa'

const AboutUs = () => {
  return (
    <Container>
      <PageTitle title="About Us" />
      <div className='flex flex-col gap-8 text-lg'>
        <div>
          <h1 className='font-bold text-2xl md:text-3xl self-center justify-self-center mb-2 shadow-xs shadow-base-content w-fit p-2 rounded-md text-center'>About YourWORDS</h1>

          <div className='space-y-2'>
            <p>
              <span className='font-semibold'>YourWORDS</span> is an intuitive and modern blogging platform built to empower users to express their thoughts, ideas, and creativity effortlessly.
            </p>

            <p>
              It serves as a digital space where writers, creators, and readers connect through meaningful content. Whether you're sharing experiences, tutorials, or personal stories, YourWORDS provides the tools to publish and engage.
            </p>

            <p>
              The platform allows users to register or sign in, create personalized profiles, write and manage blog posts, interact through likes and comments, and explore content posted by others. With an admin dashboard to manage users and posts, the system ensures quality and control throughout the platform.
            </p>

            <p>
              Our goal is to offer a secure, user-friendly environment that encourages open expression and builds a vibrant online writing community.
            </p>
          </div>
        </div>
        <div>
          <h1 className='font-bold text-2xl md:text-3xl self-center justify-self-center mb-2 shadow-xs shadow-base-content w-fit p-2 rounded-md'> Why We Started?</h1>

          <div className='space-y-2'>
            <p>
              In today’s digital age, everyone has something valuable to share — a story, an opinion, a skill, or an experience. Yet, many voices go unheard due to a lack of accessible and user-friendly platforms.
            </p>

            <p>
              <span className='font-semibold'>YourWORDS</span> was born out of the idea that self-expression should be simple, inclusive, and impactful. We noticed that while social media often focuses on short-form, fast content, there was a need for a space where people could slow down, write, and truly express themselves.
            </p>

            <p>
              Whether you’re an aspiring writer, a passionate learner, or someone who simply loves to share thoughts — YourWORDS gives you the platform to do it your way. It’s more than just a blog site; it’s your space, your stories, YourWORDS.
            </p>
          </div>
        </div>
        <div>
          <h1 className='font-bold text-2xl md:text-3xl self-center justify-self-center mb-2 shadow-xs shadow-base-content w-fit p-2 rounded-md'> What We Provide?</h1>

          <div className='space-y-2'>
            <p>
              <span className='font-semibold'>YourWORDS</span> is a modern content-sharing platform designed to bring together individuals who are passionate about writing, expressing, and connecting through words.
            </p>

            <p>
              The platform enables users to create accounts, share their thoughts in the form of blog posts, and engage with a community through likes and comments.
            </p>

            <p>
              Through a clean and user-friendly interface, YourWORDS ensures a smooth writing and reading experience. The system supports seamless Google sign-up, making it easier for users to join and start creating.
            </p>

            <p>
              It empowers writers by offering a space to publish their voice, while readers can interact and discover posts from various categories.
            </p>

            <p>
              Admins have control over the platform, managing user content and ensuring a safe and constructive environment.
            </p>

            <p>
              By combining creativity, connection, and simplicity, YourWORDS supports users in expressing themselves and building a meaningful presence online.
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-2xl md:text-3xl self-center justify-self-center mb-2 shadow-xs shadow-base-content w-fit p-2 rounded-md'> Have a Question?</h1>
          <p>Reach out to us — we’re always happy to chat!</p>
          <Link
            to="/contact-us"
            className='w-fit flex flex-row items-center text-blue-600 link-hover gap-2'
          >
            Contact Us <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default AboutUs