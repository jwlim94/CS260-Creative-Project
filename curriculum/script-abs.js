window.addEventListener("DOMContentLoaded", function(event){
  event.preventDefault();
  const url = "https://wger.de/api/v2/exercisecategory/"
  fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
      document.getElementById("card1").innerHTML = json.results[0].name;
      document.getElementById("card2").innerHTML = json.results[1].name;
      document.getElementById("card3").innerHTML = json.results[2].name;
      document.getElementById("card4").innerHTML = json.results[6].name;
      document.getElementById("card5").innerHTML = json.results[4].name;
      document.getElementById("card6").innerHTML = json.results[5].name;
    });
});
