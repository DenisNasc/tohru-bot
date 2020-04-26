const axios = require('axios')

const axiosConfig = AUTHORIZATION => {
  const config = {
    baseURL: 'https://api.pubg.com/shards/pc-sa',
    timeout: 10000,
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer ${AUTHORIZATION}`
    }
  }
  return axios.create({...config})
}

module.exports = axiosConfig
