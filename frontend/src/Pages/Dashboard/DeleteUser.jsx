import React, { useState, useEffect } from 'react';
import { Button, Input } from '../../Components/CompsIndex.js';
import { API } from '../../API/API.js';
import { useDispatch } from 'react-redux';
import { deleteUserSuccess } from '../../Store/User/userSlice.js';

const DeleteUser = () => {
    const [formData, setFormData] = useState({ password: "" });
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();

    const clearError = () => {
        setTimeout(() => setErrorMsg(null), 2000);
    };

    useEffect(() => {
        if (errorMsg) clearError();
    }, [errorMsg]);

    const handleOnChange = (e) => {
        setFormData({ password: e.target.value.trim() });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!formData.password) {
            setErrorMsg("Password is required!");
            return;
        }

        try {
            const deleteUser = await API.post("/user/delete-user", formData);
            if (deleteUser) {
                dispatch(deleteUserSuccess());
                window.location.href = "/sign_up";
            }
        } catch (error) {
            setErrorMsg(error?.response?.data?.message || "Delete User Issue");
        }
    };

    const handleClose = () => {
        setErrorMsg(null); // Clear error when closing modal
        setFormData({ password: "" }); // Reset form data
        document.getElementById("deleteAccount").close(); // Close the modal
    };

    return (
        <div>
            <p
                onClick={() => document.getElementById('deleteAccount').showModal()}
                className='cursor-pointer hover:text-red-600 font-bold hover:scale-110'
            >
                Delete Account
            </p>

            <dialog id="deleteAccount" className="modal text-center">
                <div className="modal-box rounded-xl">
                    <p className="py-4 font-bold">Are You Sure?<br />You Want to Delete This Account?</p>
                    <p className='mb-1'>Enter Your Password to delete your account.</p>

                    <form onSubmit={handleOnSubmit} className='flex flex-col items-center space-y-2'>
                        {errorMsg && (
                            <div
                                role="alert"
                                className="alert alert-error alert-soft flex justify-center text-center"
                            >
                                {`👀 ${errorMsg}`}
                            </div>
                        )}
                        <Input
                            placeholder='Your Password'
                            type='password'
                            onChange={handleOnChange}
                            value={formData.password} // ✅ Controlled input
                            id='password'
                        />
                        <button
                            type="submit"
                            text=""
                            className="btn btn-dash btn-error h-8 w-28 text-nowrap rounded-lg"
                        >
                            Confirm Delete
                        </button>
                    </form>
                    <div className="modal-action">
                        <Button
                            text="Cancel"
                            onClick={handleClose}
                            className="w-20"
                        />


                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DeleteUser ;
