import React from 'react'

import './index.css'

export const UserDetails = (props) => {
  const { firstName, lastName, email, jsBeatsTs } = props
  return (
    <div>
      <ul className="userDetails">
        <li><b>First Name:</b> {firstName}</li>
        <li><b>Last Name:</b> {lastName}</li>
        <li><b>Email:</b> {email}</li>
        <li><b>Admits JS &gt; TS?</b> { jsBeatsTs >= 100 ? 'Obviously' : 'No, they must be in denial'}</li>
      </ul>
    </div>
  )
}
