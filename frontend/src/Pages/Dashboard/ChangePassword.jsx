import React, { useState } from 'react'
import { FaKey } from 'react-icons/fa'
import {Input,Button} from "../../Components/CompsIndex.js"

const ChangePassword = ({onClose}) => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: ""
    })

    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value.trim()
        }))
    }
    
    return (
        <div className='mt-2 w-full space-y-2'>
            <Input
                icon={FaKey}
                type="password"
                placeholder="Old Password"
                id="oldPassword"
                onChange={handleOnChange}
            />
            <Input
                icon={FaKey}
                type="password"
                placeholder="New Password"
                id="newPassword"
                onChange={handleOnChange}
            />

           <div className="flex flex-col mt-4">
            <Button
                type="submit"
                text="Update Password"
                style="gradient"
                className="w-70 text-xl" 
            />
            <Button
                type="button"
                text="Cancel"
                className="w-68 self-center rounded-sm text-lg btn-secondary hover:bg-white hover:text-secondary"
                onClick={onClose}        
            />
           </div>
        </div>
    )
}

export  {ChangePassword}