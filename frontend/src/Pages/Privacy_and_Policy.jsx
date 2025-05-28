import React from 'react'
import { Container, PageTitle } from '../Components/CompsIndex.js'

const Privacy_and_Policy = () => {
    return (
        <Container>
            <PageTitle title="Privacy and Policy" />
            <div className='flex flex-col gap-8 text-lg'>
                <h1 className='font-bold text-2xl md:text-3xl self-center justify-self-center mb-2 shadow-xs shadow-base-content w-fit p-2 rounded-md text-center'>Privacy Policy for YourWORD</h1>
                <div>
                    <h1 className='font-bold md:text-2xl'>Introduction</h1>
                    <p>
                        Welcome to <span className='font-semibold'>YourWORD!</span> We care about your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our blogging platform.
                    </p>
                </div>
                <div>
                    <h1 className='font-bold md:text-2xl'>Information We Collect</h1>
                    <p>
                        We may collect the following types of information:
                        <ul className='list-disc list-inside ml-4 md:ml-8'>
                            <li><span className='font-semibold'>Personal Info: </span>Name, email, username – collected during signup or contact.</li>
                            <li><span className='font-semibold'>Usage Info: </span>Blog posts, comments, likes, and browsing behavior.</li>
                            <li><span className='font-semibold'>Technical Data: </span>Device type, browser info, IP address (used to improve security and user experience).</li>
                            <li>Admin can manage users and moderate content</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <h1 className='font-bold md:text-2xl'>
                        How We Use Your Information</h1>
                    <p>
                        Your information helps us:
                        <ul className='list-disc list-inside ml-4 md:ml-8'>
                            <li>Provide and manage your blog and user profile</li>
                            <li>Show personalized content</li>
                            <li>Improve website performance</li>
                            <li>Ensure safety and prevent abuse</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <h1 className='font-bold md:text-2xl'>Information Sharing</h1>
                    <p>
                        We do not sell or trade your data. However, we may share data:
                        <ul className='list-disc list-inside ml-4 md:ml-8'>
                            <li>If required by law</li>
                            <li>To prevent fraud or misuse</li>
                            <li>With admin/moderators for content review</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <h1 className='font-bold md:text-2xl'>Data Security</h1>
                    <p>
                        We use basic security practices to keep your data safe. While no platform is 100% secure, we take precautions to avoid data loss, theft, or unauthorized access.
                    </p>
                </div>
                <div>
                    <h1 className='font-bold md:text-2xl'>Your Choices</h1>
                    <ul className='list-disc list-inside ml-4 md:ml-8'>
                        <li>You can update your profile info anytime</li>
                        <li>You can delete your account by contacting us</li>
                        <li>You can disable cookies in your browser settings</li>
                    </ul>
                </div>
                <div>
                    <h1 className='font-bold md:text-2xl'>Children’s Privacy</h1>
                    <p>
                        Our site is not meant for children under 13. We do not knowingly collect their data. If we find out we have, we’ll delete it.
                    </p>
                </div>
                <div>
                <h1 className='font-bold md:text-2xl'>Contact Us</h1>
                    Have questions about this policy? 
                    <br /> Reach out to us at: <span className='cursor-pointer text-blue-600 link-hover'>yourword.project@gmail.com</span>
                </div>
            </div>
        </Container>
    )
}

export default Privacy_and_Policy