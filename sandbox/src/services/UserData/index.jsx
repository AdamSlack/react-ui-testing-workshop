import axios from 'axios'

const userDetailsEndpoint = 'https://fake-url.fake/userDetails'

export const saveUserDetails = (userDetails) => {
  return axios({
    url: userDetailsEndpoint,
    method: 'POST',
    data: userDetails,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getUserDetails = (userId) => {
  return axios({
    url: `${userDetailsEndpoint}/${userId}`,
    method: 'GET',
  })
}

