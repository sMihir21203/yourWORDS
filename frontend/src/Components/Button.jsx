import React from 'react'

const Button = ({
    style = "default",
    icon: Icon,
    urlIcon,
    iconSize = 20,
    text,
    className = "",
    ...props
}) => {

    const styles = {
        default: "btn w-10 h-9 p-1 border-3 rounded-lg",
        gradient: "btn h-10 p-1 border-3 rounded-lg w-20 text-white bg-gradient-to-r from-pink-600 to-blue-600  hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-600"
    }

    return <button className={`${styles[style]} ${className}`} {...props}>
        {Icon && <Icon size={iconSize} />}
        {urlIcon &&<img src={urlIcon} className= 'w-fit h-12' />}
        {text && <span>{text}</span>}
    </button>;
}

export default Button