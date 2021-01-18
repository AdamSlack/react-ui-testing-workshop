import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import { UserLoginForm } from '.'

let baseProps

beforeEach(() => {
  baseProps = {
    submitHandler: jest.fn()
  }
})

const completeForm = async (values) => {
  const { email, password } = values
    
  await userEvent.type(screen.getByLabelText(/email/i), email)
  await userEvent.type(screen.getByLabelText(/password/i), password)
}

const expectedFields = [
  { label: /email/i },
  { label: /password/i },
]

describe('When rendering the form', () => {
  beforeEach(() => {
    render(<UserLoginForm {...baseProps} />)
  })

  it.each(expectedFields)('Should display a labelled input field for %s', ({label}) => {
    expect(screen.getByLabelText(label)).toBeInTheDocument()
  })
})


const fieldsToComplete = [
  { email: 'aaron.rodgers@greenbaypackers.com' },
  { email: '', password: 'password123' },
  { email: 'not an email',  password: 'password123' },
]

describe.each(fieldsToComplete)('when submitting an invalid form with the following fields %s', (fields) => {
  beforeEach(async () => {
    render(<UserLoginForm {...baseProps} />)
    await completeForm(fields)
    await act(async () => await userEvent.click(screen.getByText(/submit/i)))
  })

  it('should not submit the form', () => {
    expect(baseProps.submitHandler).not.toHaveBeenCalled()
  })
})

describe('when an invalid email is entered', () => {
  beforeEach(async () => {
    render(<UserLoginForm {...baseProps} />)
    await completeForm({ email: 'fake-email'});
    await act(async () => await userEvent.click(screen.getByText(/submit/i)))
  })

  it('should not submit the form', () => {
    expect(baseProps.submitHandler).not.toHaveBeenCalled()
  })

  it('should display an error message', () => {
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
  })
})

describe('When submitting the form with valid values', () => {
  let expectedValues

  beforeEach(async () => {
    expectedValues = { 
      email: 'aaron.rodgers@greenbaypackers.com',
      password: 'password123'
    }

    render(<UserLoginForm {...baseProps} />)
  
    await completeForm(expectedValues)
    await act(async () => await userEvent.click(screen.getByText(/submit/i)))
  })

  it('should use the submitHandler', () => {
    expect(baseProps.submitHandler).toHaveBeenCalledWith(expectedValues, expect.any(Object))
  })
})