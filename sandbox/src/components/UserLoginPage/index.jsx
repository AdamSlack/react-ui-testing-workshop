import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { UserDetailsForm } from '../UserDetailsForm'
import { saveUserDetails } from '../../services/UserData'

import './index.css'

export const UserLoginPage = withRouter((props) => {
  const { register, watch } = useForm({ mode: 'onChange' })
  const isNewUser = watch('newUser')
  console.log(watch())

  const createNewUserSubmitHandler = async (formData) => {
    await saveUserDetails(formData)
    props.history.push('/home')
  }

  return (
    <div>
      <h2>Login!</h2>
      {
        isNewUser
        ? <UserDetailsForm submitHandler={createNewUserSubmitHandler}/>
        : <div>Login Form</div>        
      }

    <form>
        <section>

          <label htmlFor="yesNewUser">
            <input 
              type="checkbox" 
              name="newUser" 
              id="yesNewUser"
              ref={register({required: true })}
            />
            Create new account?
          </label>

        </section>
      </form>
    </div>
  )
})
