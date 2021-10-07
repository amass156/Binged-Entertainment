// get request from api
const https = require("http")
const URI = 'example.com';
const encodedURI = encodeURI(URI);

//path_result should give you body of search
//input is movie and YEAR
// for result in searchResults {
//   if (result.year == YEAR){
//     movie = result.movie_name
//   }else{
//     movie == null
//   }
// }

// you need to find a way to reference options from this file in the controller that you want
// start small and focus on just referencing options.Search.etcetc

const options = {
  hostname: 'www.omdbapi.com',
  path: encodeURI("/?apikey=3cc3d0ed&s=black panther"),
  method: 'GET'
}

let blackPanther = [] 


const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', d => {
    // process.stdout.write(d)
    console.log(d);
      // return blackPanther.push(d)
    })
    // .then(d => {
    //     blackPanther.push(data)
    // })
  })
  console.log(req.data);

  req.on('error', error => {
    console.error(error)
  })
  
  req.end()
