function electionData() {
  
  let stateNameElement = document.querySelector("#state-name");
  let winningPartyElement = document.querySelector("#winning-party");

  function chooseState(response, name) {
    states = response.data.states;
    for (let i = 0; i < states.length; i++) {
      if (states[i].state.localisedItems[1].longName == name) {
        return i;
      }
    };
  
  }

  function printStateName(response, stateCode) {
    stateNameElement.innerHTML = (response.data.states[stateCode].state.localisedItems[1].longName);
  }


  function printPartyResults(response) {
    
    results = response.data.stateResults[0].stateResult.resultItems;
    let resultsElement = document.querySelector("#results");
    let resultsHTML = "";
    results.forEach(function(party) {
      votes = party.localisedItems[1].votes;
      votesAsPercentage = Math.round(party.share);
      partyName = printPartyName(party.partyCode);
      
      resultsHTML += 
      `<li>${partyName} party</li>
      <li>${votes} votes</li>
      <li>${votesAsPercentage}%</li>`;
   
      
    })
    resultsElement.innerHTML = resultsHTML;
  }

  function getPartyName(response) {

    partyCode = (response.data.stateResults[0].stateResult.oldPartyCode);
    winningPartyElement.innerHTML = printPartyName(partyCode);

    printPartyResults(response)

  }
  
  function printPartyName(code) {
    let partyName = ""
    switch (code) {
      case "GOP":
        partyName = "Republican";
        break;
      case "DEM":
        partyName = "Democrat";
        break;
      case "OTH":
        partyName = "Other";
        break;
    }
    return partyName

  }

  function api_test(call, methodName) {
   
    let apiKey = "6841a8f6eab8ec70512df6bf3950a0cd51d4f9b7373b9df5";
    let apiUrl = `https://jse-assignment.herokuapp.com/USElection/${call}`;
    axios.get(apiUrl, {
      headers: {
        'x-api-key': apiKey
      }
    }).then(methodName)
  }
  


  api_test("states/", dataController)
  api_test("presidential/stateresults/", getPartyName)
  

  function dataController(response) {
    stateCode = chooseState(response, "Alaska");
    printStateName(response, stateCode);
  }

}

electionData()





