import React, { useState, useEffect } from 'react';
import { Button, Input } from '../CompsIndex.js';
import { API } from '../../API/API.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccountSuccess } from '../../Store/User/userSlice.js';

const DeleteAccount = ({
    text = "Delete",
    className = "",
    showInput = false,
    userId = {}
}) => {
    const loggedInUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser);
    const isAdmin = loggedInUser?.isAdmin;
    const selfDelete = loggedInUser?._id === userId;

    const [formData, setFormData] = useState({ password: "" });
    const [errorMsg, setErrorMsg] = useState(null);
    const [refreshPage, setRefreshPage] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (refreshPage) {
            window.location.reload();
        }
    }, [refreshPage]);

    const handleOnChange = (e) => {
        setFormData({ password: e.target.value.trim() });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const deleteRes = await API.post(`/user/${userId}/delete-user`, formData);
            if (deleteRes.status === 200) {
                handleClose();
                if (selfDelete) {
                    dispatch(deleteAccountSuccess());
                    window.location.href = "/sign_up";
                } else {
                    setRefreshPage(true);
                }
            }
        } catch (error) {
            setErrorMsg(error?.response?.data?.message || "Delete User Issue");
        }
    };

    const handleClose = () => {
        setErrorMsg(null);
        setFormData({ password: "" });
        document.getElementById("deleteAccount").close();
    };

    return (
        <>
            <p
                onClick={() => document.getElementById('deleteAccount').showModal()}
                className={`cursor-pointer link-hover font-bold ${className}`}
            >
                {text}
            </p>

            <dialog id="deleteAccount" className="modal text-center">
                <form onSubmit={handleOnSubmit} className='modal-box rounded-xl w-sm md:w-md flex flex-col items-center space-y-2'>
                    {errorMsg && (
                        <div role="alert" className="alert alert-error alert-soft flex justify-center text-center">
                            {`👀 ${errorMsg}`}
                        </div>
                    )}
                    <p className="font-bold">Are You Sure?<br />You Want to Delete This Account?</p>
                    {(!isAdmin || showInput) && (
                        <div className='w-full py-2'>
                            Enter Password To Delete Account!
                            <Input
                                required
                                placeholder='Your Password'
                                type='password'
                                onChange={handleOnChange}
                                value={formData.password}
                                id='password'
                            />
                        </div>
                    )}
                    <div className='flex gap-2'>
                        <Button
                            text="Delete"
                            type="submit"
                            className="text-[1rem] w-20 text-error shadow-error"
                        />
                        <Button
                            type="button"
                            text="Cancel"
                            onClick={handleClose}
                            className="text-[1rem] w-20 text-success shadow-success"
                        />
                    </div>
                </form>
            </dialog>
        </>
    );
};

export default DeleteAccount;
