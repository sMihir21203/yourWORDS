import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector(state => state.theme)
  useEffect(() => {
    const root = document.documentElement
    root.style.transition = "background-color 1s ease, color 1s ease";

    const header = document.querySelector('.navbar')
    if (header) {
      header.style.transition = "background-color 1s ease, color 0.3s ease";
    }

    root.setAttribute("data-theme", theme)

  }, [theme])
  return (
    <div className={theme}>
      {children}
    </div>
  )
}

export default ThemeProvider