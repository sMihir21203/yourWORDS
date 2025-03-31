import React from 'react'

const Container = ({ children, className = "" }) => {
  return <div className={`${className} hero h-full pt-18`}>
    <div className='hero-content'>
      {children}
    </div>
  </div>;
}

export default Container