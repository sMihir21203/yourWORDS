import React from 'react'

const DashContainer = ({ children }) => {
  return (
    <div className='hero'>
      <div className='hero-content pt-24 lg:pt-0 flex flex-col justify-center items-center min-w-full min-h-full'>
        {children}
      </div>
    </div>
  )
}

export default DashContainer