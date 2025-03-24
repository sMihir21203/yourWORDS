import React from 'react'

const Container = ({ children, className = "" }) => {
  return <div className={`${className} hero pt-18`}>
    <div className='hero-content w-screen'>
      {children}
    </div>
  </div>;
}

export default Container