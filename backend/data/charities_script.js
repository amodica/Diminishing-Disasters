const charities = require("./all_charities.json");
const countries_map = require("./charities_to_countries.json");
var updatedCharities = {};
updatedCharities.charities = [];
var current_index = 1;
for (let index = 0; index < charities.length; index++) {
  var charity_name = charities[index].charityName;
  var country_index = countries_map.findIndex((obj) => obj.charityName == charity_name);
  if (country_index != -1) {
    var charity = {
      id: current_index,
      name: charity_name,
      ein: charities[index].ein,
      score: charities[index].currentRating.score,
      rating: charities[index].currentRating.rating,
      category: charities[index].category.categoryName,
      causes: charities[index].cause.causeName,
      income: charities[index].irsClassification.incomeAmount,
      tagline: charities[index].tagLine,
      url: charities[index].websiteURL,
      address: charities[index].mailingAddress,
      countries_operating_in: countries_map[country_index].countries_operating_in,
    };
    updatedCharities.charities.push(charity);
    current_index = current_index + 1;
  }
}
var fs = require("fs");
fs.writeFile(
  "updated_charities.json",
  JSON.stringify(updatedCharities),
  function (err) {
    if (err) throw err;
    console.log("complete");
  }
);
