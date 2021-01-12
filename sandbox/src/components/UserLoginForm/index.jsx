import React from 'react'
import { useForm } from "react-hook-form";

import './index.css'

export const UserLoginForm = (props) => {
  const { submitHandler } = props
  const { handleSubmit, register } = useForm();
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="userLoginForm">
      
      <section>

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={register({
            required: true,
          })}
        />
      </section>

      <button type="submit">Submit</button>
    </form>
  )
}
