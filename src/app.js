function printApi(response) {
  console.log(response.data)
}


function api_test() {
  let apiKey = "6841a8f6eab8ec70512df6bf3950a0cd51d4f9b7373b9df5";
  let apiUrl = "https://jse-assignment.herokuapp.com/USElection/presidential/stateresults/";
  axios.get(apiUrl, {
    headers: {
      'x-api-key': apiKey
    }
  }).then(printApi)
}


api_test()