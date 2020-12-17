import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import { UserDetailsForm } from '.'

let baseProps

beforeEach(() => {
  baseProps = {
    submitHandler: jest.fn()
  }
})

const completeForm = async (values) => {
  const { firstName, lastName, email, jsBeatsTs } = values
    
  await userEvent.type(screen.getByLabelText(/first name/i), firstName)
  await userEvent.type(screen.getByLabelText(/last name/i), lastName)
  await userEvent.type(screen.getByLabelText(/email/i), email)
  await fireEvent.change(screen.getByLabelText(/how much better is js over ts\?/i), { target: { value: jsBeatsTs } })
}

const expectedFields = [
  { label: /first name/i },
  { label: /last name/i },
  { label: /email/i },
  { label: /how much better is js over ts\?/i },
]

describe('When rendering the form', () => {
  beforeEach(() => {
    render(<UserDetailsForm {...baseProps} />)
  })

  it.each(expectedFields)('Should display a labelled input field for %s', ({label}) => {
    expect(screen.getByLabelText(label)).toBeInTheDocument()
  })
})


const fieldsToComplete = [
  { firstName: 'Aaron', lastName: 'Rodgers', email: 'aaron.rodgers@greenbaypackers.com', jsBeatsTs: undefined },
  { firstName: 'Aaron', lastName: 'Rodgers', email: '', jsBeatsTs: 100 },
  { firstName: 'Aaron', lastName: '', email: 'aaron.rodgers@greenbaypackers.com', jsBeatsTs: 100 },
  { firstName: '', lastName: 'Rodgers', email: 'aaron.rodgers@greenbaypackers.com', jsBeatsTs: 100 },
  { firstName: 'A', lastName: 'Rodgers', email: 'aaron.rodgers@greenbaypackers.com', jsBeatsTs: 100 },
  { firstName: 'Aaron', lastName: 'r', email: 'aaron.rodgers@greenbaypackers.com', jsBeatsTs: 100 },
  { firstName: 'Aaron', lastName: 'Rodgers', email: 'not an email', jsBeatsTs: 100 },
  { firstName: 'tooLong'.repeat('10'), lastName: 'Rodgers', email: 'aaron.rodgers@greenbaypackers.com', jsBeatsTs: 100 },
  { firstName: 'Aaron', lastName: 'tooLong'.repeat(10), email: 'aaron.rodgers@greenbaypackers.com', jsBeatsTs: 100 },
]

describe.each(fieldsToComplete)('when submitting an invalid form with the following fields %s', (fields) => {
  beforeEach(async () => {
    render(<UserDetailsForm {...baseProps} />)
    await completeForm(fields)
    await act(async () => await userEvent.click(screen.getByText(/submit/i)))
  })

  it('should not submit the form', () => {
    expect(baseProps.submitHandler).not.toHaveBeenCalled()
  })
})

describe('When submitting the form with valid values', () => {
  let expectedValues

  beforeEach(async () => {
    expectedValues = { 
      firstName: 'Aaron', 
      lastName: 'Rodgers', 
      email: 'aaron.rodgers@greenbaypackers.com',
      jsBeatsTs: "100"
    }

    render(<UserDetailsForm {...baseProps} />)
  
    await completeForm(expectedValues)
    await act(async () => await userEvent.click(screen.getByText(/submit/i)))
  })

  it('should use the submitHandler', () => {
    expect(baseProps.submitHandler).toHaveBeenCalledWith(expectedValues, expect.any(Object))
  })
})