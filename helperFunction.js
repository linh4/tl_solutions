const axios = require("axios")

// using async await es7 to make a get request and add status as a key in the url objects
const fetchUrls = async url => {
  // get the successful response status
  try {
    const response = await axios.get(url.url, {timeout: 1000})
    return { ...url, status: 'ok' }
  }
  // catch the errors
  catch (error) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response) {
      return { ...url, status: error.response.status }
    }
    // The request was made but no response was received
    else if (error.request) {
        return { ...url, status: error.code }
    }
    // Something happened in setting up the request that triggered an Error
    else {
      return { ...url, status: error }
    }
  }
}

const results = async urls => {
  let range = urls.length,
      success = 0,
      failed = 0,
      errors = 0,
      failedUrls = []
      successUrls = []
  // run the big dataset array in small blocks for more accurate results
  for (let x = 0;  x < range; x+=100 ) {
      console.log(`Loading data from ${x} to ${x+100}...`)
      const newArr = urls.slice(x, x+100);
      const promiseArr = newArr.map(url => fetchUrls(url))
      const results = await axios.all(promiseArr)
      results.forEach(result => {
        let status = result.status.toString().charAt(0)
        if (result.status === 'ok') {
          success++
          successUrls.push(result)
        } else if (status === '4' || status === '5') {
          failed++
          failedUrls.push(result)
        } else {
           errors++
          failedUrls.push(result)
        }
    })
  }
  console.log('------------------------------')
  console.log('++ SUCCESS:', success, '\n-- FAILURE:', failed, '\n** ERROR:', errors)
  console.log('------------------------------')
  console.log('Failed tactic_id & url:')
  // print out the failed urls
  console.log(failedUrls)
  return failedUrls
}

module.exports = { fetchUrls, results }
