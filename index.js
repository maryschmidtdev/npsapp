"use strict";

// put your own value below!
const apiKey = "47cpKe28N0zP9QP2YJtAgmNiiQCdVicOMrk3f295";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(query, maxResults) {
  console.log(query.split(", "));
  const stateArr = query.split(", ");
  const stateString = stateArr.map((state) => {
    return "stateCode=" + state;
  });
  return stateString.join("&") + "&limit=" + maxResults + "&api_key=" + apiKey;
}

function displayResults(responseJson) {
  // if there are previous results, remove them

  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3></li>
      <li>${responseJson.data[i].description}</li>
      <li><a href = ${responseJson.data[i].url}>${responseJson.data[i].url}</a></li>
      `
    );
  }

  $("#results").removeClass("hidden");
}

function getParks(query, maxResults = 10) {
  const queryString = formatQueryParams(query, maxResults);
  const url = searchURL + "?" + queryString;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    $("#results-list").empty();
    const searchTerm = $("#js-search-term").val();
    const maxResults = $("#js-max-results").val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);
