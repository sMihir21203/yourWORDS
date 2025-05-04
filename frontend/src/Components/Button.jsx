import React from 'react'

const Button = ({
    style = "default",
    icon: Icon,
    iconSize = 20,
    text,
    className = "",
    ...props
}) => {

    const styles = {
        default: "w-9 h-9 flex ",
        imp: "min-w-full h-10 text-xl hover:pb-1",
    }

    return <button className={`items-center justify-center cursor-pointer font-bold  border-none rounded-lg  shadow hover:shadow-md shadow-base-content ${styles[style]} ${className}`} {...props}>
        {Icon && <Icon size={iconSize} />}
        {text && <span>{text}</span>}
    </button>;
}

export default Button