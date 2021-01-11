import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import { UserLoginPage } from '.'
import { saveUserDetails } from '../../services/UserData'
import { UserDetailsForm } from '../UserDetailsForm'

jest.mock('../../services/UserData')
jest.mock('../UserDetailsForm')

let baseProps = {};

beforeEach(() => {
  jest.resetAllMocks()
  jest.clearAllMocks()
  
  saveUserDetails.mockResolvedValue({ data: 'fake-response' })

  UserDetailsForm.mockImplementation(
    ({submitHandler}) => (
      <button onClick={submitHandler}>mock-user-details-form</button>
    )
  )

  baseProps = {
    history: { push: jest.fn() }
  }
})

describe('when rendering the UserLoginPage', () => {
  beforeEach(() => {
    render(<UserLoginPage.WrappedComponent {...baseProps} />)
  })

  it.skip('should show the user login form by default', () => {
    
  })

  it('should show a "Create new user checkbox"', async () => {
    const createNewUserCheckbox = await screen.findByLabelText('Create new account?')
    expect(createNewUserCheckbox).toBeInTheDocument();
  })

  it('should default the "Create new user checkbox" to be unchecked', async () => {
    const createNewUserCheckbox = await screen.findByLabelText('Create new account?')
    expect(createNewUserCheckbox.checked).toEqual(false);
  })

  it('should not show the new user form', async () => {
    const newUserForm = await screen.queryByText('mock-user-details-form')
    expect(newUserForm).not.toBeInTheDocument()
  })
})

describe('when selecting "Create new account?"', () => {
  beforeEach(async () => {
    render(<UserLoginPage.WrappedComponent {...baseProps} />)

    const createNewUserCheckbox = await screen.findByLabelText('Create new account?')
    await act(async () => {
      userEvent.click(createNewUserCheckbox)
    })
  })

  it('should show the "Create new user checkbox" as checked', async () => {
    const createNewUserCheckbox = await screen.findByLabelText('Create new account?')
    expect(createNewUserCheckbox.checked).toEqual(true);
  })

  it.skip('should not show the login form component', () => {

  });

  it('should display the new user form component', async () => {
    const newUserForm = await screen.queryByText('mock-user-details-form')
    expect(newUserForm).toBeInTheDocument()
  });
})

describe('when de-selecting "Create new account?"', () => {
  beforeEach(async () => {
    render(<UserLoginPage.WrappedComponent {...baseProps} />)

    const createNewUserCheckbox = await screen.findByLabelText('Create new account?')
    
    await act(async () => {
      userEvent.click(createNewUserCheckbox)
    })

    await act(async () => {
      userEvent.click(createNewUserCheckbox)
    })
  })

  it.skip('should show the login form component', () => {

  });

  it('should not display the new user form component', async () => {
    const newUserForm = await screen.queryByText('mock-user-details-form')
    expect(newUserForm).not.toBeInTheDocument()
  });
})

describe.only('when submitting submiting the new user form', () => {
  beforeEach(async () => {
    render(<UserLoginPage.WrappedComponent {...baseProps} />)

    const createNewUserCheckbox = await screen.findByLabelText('Create new account?')
    await act(async () => {
      await userEvent.click(createNewUserCheckbox)
    })
    
    const newUserForm = await screen.getByText('mock-user-details-form')
    await act(async () => {
      await userEvent.click(newUserForm)
    })
  })

  it('should save user details', () => {
    expect(saveUserDetails).toHaveBeenCalledTimes(1)
  })

  it('should re-navigate to the home page', () => {
    expect(baseProps.history.push).toHaveBeenCalledWith('/home')
  })
})

describe('when submitting the login form', () => {
  
})