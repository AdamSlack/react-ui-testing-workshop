import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { getUserDetails, saveUserDetails } from '../../services/UserData'
import { UserDetails } from '../UserDetails';
import { UserDetailsForm } from '../UserDetailsForm'

import './index.css'

export const UserDetailsPage = (props) => {
  const { userId } = props
  const { register, watch } = useForm()
  const isEditing = watch('editDetails')

  const [userDetails, setUserDetails] = React.useState({})
  const [pageError, setPageError] = React.useState('')

  const saveUserSubmitHandler = async (formData) => {
    await saveUserDetails(formData)
  }


  const fetchUserDetails = async () => {
    try {
      setUserDetails(await getUserDetails(userId))
    } catch(err) {
      setPageError('Error fetching user details')
    }
  }
  useEffect(() => fetchUserDetails(), [])

  return (
    <div>
      <h2>Your Details!</h2>

    <form>
        <section>

          <label htmlFor="editDetails">
            <input
              type="checkbox"
              name="editDetails"
              id="editDetails"
              ref={register()}
            />
            Edit your Details?
          </label>

        </section>
      </form>

      {
        isEditing
        ? <UserDetailsForm submitHandler={saveUserSubmitHandler}/>
        : <UserDetails {...userDetails} />
      }

      {pageError && <p>{pageError}</p>}

    </div>
  )
}
