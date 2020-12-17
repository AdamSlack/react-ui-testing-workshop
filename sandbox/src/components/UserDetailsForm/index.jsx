import React from 'react'
import { useForm } from "react-hook-form";

import './index.css'

export const UserDetailsForm = (props) => {
  const { submitHandler } = props
  const { handleSubmit, register } = useForm();
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="userDetailsForm">
      
      <section>
        <h2>Who are you?</h2>

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          ref={register({
            required: true,
            minLength: 2,
            maxLength: 15
          })}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          ref={register({
            required: true,
            minLength: 2,
            maxLength: 15
          })}
        />
      </section>

      <section>
        <h2>How can we contact you?</h2>

        <label htmlFor="email">Email:</label>
        <input
          type=""
          name="email"
          id="email"
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
        />
      </section>

      <section>
        <h2>How can we contact you?</h2>
        
        <label htmlFor="jsBeatsTs">How much better is JS over TS?:</label>
        <input
          type="number" 
          id="jsBeatsTs" 
          name="jsBeatsTs" 
          min="100"
          max="100"
          ref={register({
            required: true,
            max: 100,
            min: 100,
          })}
        />
      </section>

      <button type="submit">Submit</button>
    </form>
  )
}
