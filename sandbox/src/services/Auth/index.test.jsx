import axios from 'axios'

import { login, getUserToken} from '.'

jest.mock('axios')

describe('when login invoked with an email and password', () => {
  beforeEach(async () => {
    axios.mockResolvedValueOnce({ data: { token: 'test-token' } })
    await login({ email: 'test@test.com', password: '1234'})
  })

  it('should make a valid POST request', () => {
    expect(axios).toHaveBeenCalledWith({
      url: 'https://fake-url.fake/auth',
      method: 'POST',
      data: { email: 'test@test.com', password: '1234' },
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })

  it('should store the result as a user token', () => {
    expect(getUserToken()).toEqual('test-token')
  })
})

describe('when login invoked without an email', () => {
  beforeEach(async () => {
    axios.mockResolvedValueOnce({ data: { token: 'test-token' } })
    await login({ password: '1234'})
  })

  it('should make a post request with an undefined email', () => {
    expect(axios).toHaveBeenCalledWith({
      url: 'https://fake-url.fake/auth',
      method: 'POST',
      data: { email: undefined, password: '1234' },
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
})

describe('when login invoked without a password', () => {
  beforeEach(async () => {
    axios.mockResolvedValueOnce({ data: { token: 'test-token' } })
    await login({ email: 'test@test.com'})
  })

  it('should make a post request with an undefined email', () => {
    expect(axios).toHaveBeenCalledWith({
      url: 'https://fake-url.fake/auth',
      method: 'POST',
      data: { email: 'test@test.com', password: undefined },
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
})

describe('when axios request rejects', () => {
  let result;

  beforeEach(async () => {
    axios.mockRejectedValueOnce('fake-error')
    try {
      await login({ email: 'test@test.com', password: '1234' })
    } catch(err) {
      result = err
    }
  })

  it('should make a post request with an undefined email', () => {
    expect(axios).toHaveBeenCalledWith({
      url: 'https://fake-url.fake/auth',
      method: 'POST',
      data: { email: 'test@test.com', password: '1234' },
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })

  it('should propagate the error response', () => {
    expect(result).toEqual('fake-error')
  })
})

