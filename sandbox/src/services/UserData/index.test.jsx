import axios from 'axios'

import { saveUserDetails, getUserDetails } from '.'

jest.mock('axios')


describe('saveUserDetails', () => {
  describe('when saveUserDetails invoked with userDetails', () => {
    let result;
    
    beforeEach(async () => {
      axios.mockResolvedValueOnce({ data: 'fake-response' })
      result = await saveUserDetails({ user: 'fake-data' })
    })
    
    it('should make a valid POST request', () => {
      expect(axios).toHaveBeenCalledWith({
        url: 'https://fake-url.fake/userDetails',
        method: 'POST',
        data: { user: 'fake-data' },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })

    it('should return the result', () => {
      expect(result).toEqual({ data: 'fake-response' })
    })
  })

  describe('when saveUserDetails rejects', () => {
    let result;
    
    beforeEach(async () => {
      axios.mockRejectedValueOnce('fake-error')
      try {
        await saveUserDetails({ user: 'fake-data' })
      } catch(err) {
        result = err
      }
    })
    
    it('should make a valid POST request', () => {
      expect(axios).toHaveBeenCalledWith({
        url: 'https://fake-url.fake/userDetails',
        method: 'POST',
        data: { user: 'fake-data' },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })

    it('should propagate the error', () => {
      expect(result).toEqual('fake-error')
    })
  })
})


describe('saveUserDetails', () => {
  describe('when getUserDetails invoked with a userID', () => {
    let result;

    beforeEach(async () => {
      axios.mockResolvedValueOnce({ data: 'fake-response' })
      result = await getUserDetails(1234)
    })

    it('should make a valid POST request', () => {
      expect(axios).toHaveBeenCalledWith({
        url: 'https://fake-url.fake/userDetails/1234',
        method: 'GET',
      })
    })

    it('should return the result', () => {
      expect(result).toEqual({ data: 'fake-response' })
    })
  })

  let result;
    
  beforeEach(async () => {
    axios.mockRejectedValueOnce('fake-error')
    try {
      await getUserDetails(1234)
    } catch(err) {
      result = err
    }
  })
  
  it('should make a valid POST request', () => {
    expect(axios).toHaveBeenCalledWith({
      url: 'https://fake-url.fake/userDetails/1234',
      method: 'GET',
    })
  })

  it('should propagate the error', () => {
    expect(result).toEqual('fake-error')
  })
})

