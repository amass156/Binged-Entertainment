// get request from api
const https = require("http")
const URI = 'example.com';
const encodedURI = encodeURI(URI);

const options = {
    hostname: 'www.omdbapi.com',
    path: encodeURI("/?apikey=3cc3d0ed&s=black panther"),
    method: 'GET'
  }
  
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      process.stdout.write(d)
    //   console.log(JSON.parse(d))
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.end()