import React from 'react'

const DashContainer = ({ children }) => {
  return (
    <div className='hero'>
      <div className='hero-content pt-24 flex flex-col justify-center items-center min-w-full h-auto'>
        {children}
      </div>
    </div>
  )
}

export default DashContainer