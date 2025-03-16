import React from 'react'

const Container = ({ children }) => {
  return <div
    style={{ backgroundImage: "url(https://i.pinimg.com/736x/ed/e9/a4/ede9a46da88886b9a98b13f076343e35.jpg)" }}
    className='hero min-h-screen mt-12 lg:mt-0'
  >{children}
  </div>;
}

export default Container