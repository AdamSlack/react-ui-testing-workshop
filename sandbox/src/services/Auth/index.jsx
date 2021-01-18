import axios from 'axios'

const userDetailsEndpoint = 'https://fake-url.fake/auth'

export let userToken = {}

export const getUserToken = () => userToken.token


// Pseudo mercury-mobx store with side-effects to store state after making a request
export const login = async ({ email, password }) => {
  const { data } = await axios({
    url: userDetailsEndpoint,
    method: 'POST',
    data: { email, password },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  userToken = data

}