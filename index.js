const csvFilePath = 'tactic.csv'
const csv = require('fast-csv');
const axios = require("axios")
const {fetchUrls, results}  = require('./helperFunction')

// convert csv file to json objects
const final = () => {
  const arr = []
  csv
   .fromPath(csvFilePath,{headers: true, objectMode: true})
   .on("data", function(data){
     arr.push(data)
   })
   .on("end", function(){
     console.log('------ Total Record', arr.length, '------')
     getArr(arr)
   });
}

const getArr = (jsonArr) => {
  const validUrls = []
  jsonArr.forEach(json => {
        // only get the valid URLS which are not null and empty array
        if (json.impression_pixel_json !== "NULL" && json.impression_pixel_json !== '[]') {
            // Remove quotes and square brackets
            const fixedLinks = json.impression_pixel_json.slice(2, -2).replace(/\\*/g, "")
            // some urls have more than one link, split to seperate them
            const finalLinks = fixedLinks.split('","')
            // make new objects from the fixed URLS with tactic_id and url as headers
            finalLinks.forEach(link => {
              validUrls.push({tacticId: json.tactic_id, url: link})
          })
        }
    })
    console.log('[     ', "Valid URLS: ", validUrls.length,)
    console.log("      NULL & [] URLS: ", jsonArr.length - validUrls.length, '    ]')
    console.log('------------------------------')
    // call the result function with valid urls as the argument
    results(validUrls)
    // return the valid urls for testing purposes
    return validUrls
}

final()

module.exports = getArr
