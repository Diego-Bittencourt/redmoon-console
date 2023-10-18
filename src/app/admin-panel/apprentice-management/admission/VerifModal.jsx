"use client"
import ModalLayout from '@/components/ModalLayout/ModalLayout';
import OnSuccess from '@/components/OnSuccess';
import { useErrors } from '@/hooks';
import { createReq } from '@/lib/createReqObj';
import React, { useState } from 'react';

const VerifModal = ({ toggleModal, userId  }) => {

  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors, _, Errors] = useErrors()

  const handleOnClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
        // Define the API endpoint. Update this to your actual endpoint.

        const verifBody = {userId, emailVerified: new Date(Date.now())}
        const response = await fetch('/api/user/admin-override/verify', createReq('PATCH', verifBody))
        
        if (response.ok) {
            setSuccessMsg("User succesfully verified")
            toggleModal()
          
        } else {
        
            const errorData = await response.json();
            setErrors(errorData);
        }
    } catch (error) {
        setErrors(error.errors);
    }
}
  return (
    <ModalLayout toggleModal={toggleModal}>
      <dialog open onClick={e => e.stopPropagation()}>
        <h4>Are you sure that you want to verify this person's account?</h4>
        <p>You should let them know separately that their account has been verified</p>
        <div className="flex-center">

          <button onClick={handleOnClick}>
            Verify
          </button>
          <button onClick={toggleModal}>
            Exit
          </button>
        </div>
        {successMsg && <OnSuccess successMsg={successMsg}/>}
        {!!errors.length && <Errors errors={errors}/>} 
      </dialog>
    </ModalLayout>
  );
};

export default VerifModal;