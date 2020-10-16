document.getElementById("dietSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("dietResultText").style.display = "none";

  const value = document.getElementById("dietInput").value;
  if (value === "")
    return;
  const url = "https://api.nutritionix.com/v1_1/search/" + value + "?&fields=item_name,brand_name,nf_calories,nf_sodium,nf_total_fat,nf_cholesterol,nf_protein&appId=c5e180e2&appKey=9c8dcd46b53b59b748123b9ee4e55c27";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let result = "";
      for (let i = 0; i < json.hits.length; i++) {
        if (json.hits[i].fields.brand_name == "USDA" &&
            !result.includes(json.hits[i].fields.item_name)) {
          result += '<hr>';
          result += '<div id="dietName">' + json.hits[i].fields.item_name + '</div>';
          result += '<ul id="dietDetails">';
          result += '<li id="dietCalorie">Calorie: ' + json.hits[i].fields.nf_calories + 'kcal</li>';
          result += '<li id="dietSodium">Sodium: ' + json.hits[i].fields.nf_sodium + 'mg</li>';
          result += '<li id="dietTotalFat">Total fat: ' + json.hits[i].fields.nf_total_fat + 'g</li>';
          result += '<li id="dietCholesterol">Cholesterol: ' + json.hits[i].fields.nf_cholesterol + 'mg</li>';
          result += '<li id="dietProtein">Protein: ' + json.hits[i].fields.nf_protein + 'g</li>';
          result += '</ul>';
        }
      }
      document.getElementById("dietResult").innerHTML = result;
    });
});
