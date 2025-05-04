import React from 'react'
import { Container, PageTitle } from '../Components/CompsIndex.js'

const Terms_and_Conditions = () => {
  return (
    <Container>
      <PageTitle title="Terms and Conditions" />
      <div className='flex flex-col gap-8 text-lg'>
        <h1 className='font-bold text-2xl md:text-3xl self-center justify-self-center mb-2 shadow-xs shadow-base-content w-fit p-2 rounded-md'>Terms and Conditions for YourWORDS</h1>
        <div>
          <h1 className='font-bold md:text-2xl'>Introduction</h1>
          <p>
            Welcome to YourWORD, a user-driven blogging platform. By using our website, you agree to follow the terms below. If you do not agree, kindly stop using the platform.
          </p>
        </div>
        <div>
          <h1 className='font-bold md:text-2xl'> 1. Acceptance of Terms </h1>
          <p>
            By accessing or registering on YourWORD, you agree to these Terms and our Privacy Policy. These terms apply to all users: readers, registered members, and admin users.
          </p>
        </div>
        <div>
          <h1 className='font-bold md:text-2xl'> 2. Services Provided </h1>
          <p>
            YourWORD allows users to:
            <ul className='list-disc list-inside ml-4 md:ml-8'>
              <li>Create and publish blog posts</li>
              <li>Like and comment on posts</li>
              <li>View content published by others</li>
              <li>Admin can manage users and moderate content</li>
            </ul>
          </p>
        </div>
        <div>
          <h1 className='font-bold md:text-2xl'>3. User Accounts </h1>
          <ul className='list-disc list-inside ml-4 md:ml-8'>
            <li><span className='font-semibold'>Sign Up/Sign In:</span> Users must provide accurate details when registering.</li>
            <li><span className='font-semibold'>Security:</span> Keep your account credentials private. You're responsible for all actions done through your account.</li>
          </ul>
        </div>
        <div>
          <h1 className='font-bold md:text-2xl'>4. Content Guidelines </h1>
          <p>
            Users agree not to:
            <ul className='list-disc list-inside ml-4 md:ml-8'>
              <li>Post offensive, false, or plagiarized content</li>
              <li>Harass or impersonate others</li>
              <li>Attempt to hack, spam, or damage the site</li>
            </ul>
          </p>
        </div>
        <div>
          <h1 className='font-bold md:text-2xl'>5. Admin Rights </h1>
          <p>
            Admins may:
            <ul className='list-disc list-inside ml-4 md:ml-8'>
              <li> Remove inappropriate content</li>
              <li>Suspend or block users violating these terms</li>
              <li>Moderate comments and manage user posts</li>
            </ul>
          </p>
        </div>
        <div>
          <h1 className='font-bold md:text-2xl'>6. Limitation of Liability </h1>
          <p>
            YourWORD is a project-based platform. We are not responsible for content posted by users. All content is shared for educational and non-commercial purposes.
          </p>
        </div>
        <div>
          <h1 className='font-bold md:text-2xl'>7. Contact Us </h1>
          For questions or concerns, <br />
          <span className='font-semibold'>Email:</span> <span className='cursor-pointer text-blue-600 link-hover'>yourword.project@gmail.com</span>
        </div>
      </div>
    </Container>
  )
}

export default Terms_and_Conditions