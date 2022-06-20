function setUserChoice(name) {

  function electionData(response) {

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
      results = response.data.stateResults[stateCode].stateResult.resultItems;
      function colorPicker(party) {
        switch (party) {
          case "Republican":
            return '#E9151E';
  
          case "Democrat":
            return '#0000FF';
    
          case "Other":
            return '#75AA5E';
        
        }
      }


      JSC.Chart('chartDiv', {
        type: 'horizontal column aqua',
        yAxis_label_text: "Number of votes",
        fillStyle: '#EEEEEE',
        series: [
          {
            type: 'column',
            name: 'Total Votes',
            points: [
              {x: `${printPartyName(results[0].partyCode)} Party`, y: results[0].votes, color: colorPicker(printPartyName(results[0].partyCode))},
              {x:  `${printPartyName(results[1].partyCode)} Party`, y: results[1].votes, color: colorPicker(printPartyName(results[1].partyCode))},
              {x:  `${printPartyName(results[2].partyCode)}`, y: results[2].votes, color: colorPicker(printPartyName(results[2].partyCode))}
            ]
          }
        ]

    });

    }

    function getPartyName(response) {

      partyCode = (response.data.stateResults[stateCode].stateResult.oldPartyCode);
      winningPartyElement.innerHTML = `Winning Party: ${printPartyName(partyCode)} Party`;

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

    document.getElementById("button-list").style.display = 'none';
    document.getElementById("chart-wrapper").style.display = 'block';
    document.getElementById("return-button").style.display = 'block';
    stateCode = chooseState(response, name);
    printStateName(response, stateCode);
    api_test("presidential/stateresults/", getPartyName)
    }
    api_test("states/", electionData)
  }

  function api_test(call, methodName) {
    
    let apiKey = config.MY_API_KEY;
    let apiUrl = `https://jse-assignment.herokuapp.com/USElection/${call}`;
    axios.get(apiUrl, {
      headers: {
        'x-api-key': apiKey
      }
    }).then(methodName)
  }

  function backToStates() {
    document.getElementById("chart-wrapper").style.display = 'none';
    document.getElementById("state-info").style.display = 'none';
    document.getElementById("button-list").style.display = 'block';
    document.getElementById("return-button").style.display = 'none';

  }

  function showButtons(response) {
    document.getElementById("chart-wrapper").style.display = 'none';
    document.getElementById("return-button").style.display = 'none';
    let buttonContainer = document.querySelector("#button-list");
    let buttonsHTML = "";
    response.data.states.forEach(function(state) {
    if (!state.state.localisedItems[1].longName.includes("District")) {
        buttonsHTML += 
        `<li><button onClick="setUserChoice('${state.state.localisedItems[1].longName}')">${state.state.localisedItems[1].longName}</button></li>`
    }});
    buttonContainer.innerHTML = buttonsHTML;
}

api_test("states/", showButtons)










