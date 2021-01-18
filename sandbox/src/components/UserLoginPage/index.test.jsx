import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import { saveUserDetails } from '../../services/UserData'
import { login, getUserToken } from '../../services/Auth'
import { UserDetailsForm } from '../UserDetailsForm'
import { UserLoginForm } from '../UserLoginForm'

import { UserLoginPage } from '.'

jest.mock('../../services/UserData')
jest.mock('../../services/Auth')
jest.mock('../UserDetailsForm')
jest.mock('../UserLoginForm')

let baseProps = {};

beforeEach(() => {
  jest.clearAllMocks()
  
  saveUserDetails.mockResolvedValue({ data: 'fake-response' })

  UserDetailsForm.mockImplementation(
    ({submitHandler}) => (
      <button onClick={submitHandler}>mock-user-details-form</button>
    )
  )

  UserLoginForm.mockImplementation(
    ({submitHandler}) => (
      <button onClick={() => submitHandler({username: 'foo', password: 'bar'})}>mock-user-login-form</button>
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

  it('should show the user login form by default', async () => {
    const newUserForm = await screen.queryByText('mock-user-login-form')
    expect(newUserForm).toBeInTheDocument()
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

  it('should not show the login form component', async () => {
    const newUserForm = await screen.queryByText('mock-user-login-form')
    expect(newUserForm).not.toBeInTheDocument()
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

  it('should show the login form component', async () => {
    const newUserForm = await screen.queryByText('mock-user-login-form')
    expect(newUserForm).toBeInTheDocument()
  });

  it('should not display the new user form component', async () => {
    const newUserForm = await screen.queryByText('mock-user-details-form')
    expect(newUserForm).not.toBeInTheDocument()
  });
})

describe('when submitting submiting the new user form', () => {
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

describe('when logging in results in a user token being available', () => {
  beforeEach(async () => {
    getUserToken.mockReturnValue('fake-token')

    render(<UserLoginPage.WrappedComponent {...baseProps} />)

    const loginForm = await screen.getByText('mock-user-login-form')
    await act(async () => {
      await userEvent.click(loginForm)
    })
  })

  it('should attemt to log in once', () => {
    expect(login).toHaveBeenCalledTimes(1)
  })

  it('should attemt to log in with the provided usernamne and password', () => {
    expect(login).toHaveBeenCalledWith({ username: 'foo', password: 'bar' })
  })

  it('should navigate to the home page', () => {
    expect(baseProps.history.push).toHaveBeenCalledWith('/home')
  })
})

describe('when logging in does not result in a user token being available', () => {
  beforeEach(async () => {
    getUserToken.mockReturnValue(undefined)

    render(<UserLoginPage.WrappedComponent {...baseProps} />)

    const loginForm = await screen.getByText('mock-user-login-form')
    await act(async () => {
      await userEvent.click(loginForm)
    })
  })

  it('should attemt to log in once', () => {
    expect(login).toHaveBeenCalledTimes(1)
  })

  it('should attemt to log in with the provided usernamne and password', () => {
    expect(login).toHaveBeenCalledWith({ username: 'foo', password: 'bar' })
  })

  it('should navigate to the home page', () => {
    expect(baseProps.history.push).not.toHaveBeenCalled()
  })
})