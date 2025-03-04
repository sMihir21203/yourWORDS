import React, { useState ,useEffect} from 'react';
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
            const deleteUser = await API.post("/user/delete_user", formData);
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
                className='cursor-pointer hover:text-red-600 hover:font-bold'
            >
                Delete Account
            </p>

            <dialog id="deleteAccount" className="modal">
                <div className="modal-box">
                    <p className="py-4">Are You Sure?<br />You Want to Delete This Account?</p>
                    <p>Enter Your Password to delete your account.</p>

                    <form onSubmit={handleOnSubmit} className='flex flex-col items-center space-y-2'>
                        {errorMsg && (
                            <div
                                role="alert"
                                className="alert alert-error alert-soft flex justify-center text-center mb-2"
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
                        <Button
                            type="submit"
                            text="Confirm Delete"
                            className="btn btn-dash btn-error w-28"
                        />
                    </form>
                    <div className="modal-action">
                        <button onClick={handleClose} className="btn">
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export { DeleteUser };
