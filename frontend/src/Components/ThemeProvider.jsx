import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({children}) => {
    const {theme} = useSelector(state=>state.theme)
    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme)
      
    }, [theme])
  return (
    <div className={theme}>
        {children}
    </div>
  )
}

export default ThemeProvider