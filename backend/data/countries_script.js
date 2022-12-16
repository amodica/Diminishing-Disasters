const countries = require("./all_countries.json");
var updatedCountries = {};
updatedCountries.countries = [];
for (let index = 0; index < countries.length; index++) {
  var list_languages = countries[index].languages;
  var languages = {};
  if (typeof list_languages != "undefined") {
    languages = Object.values(list_languages);
  }
  var list_currencies = countries[index].currencies;
  var currencies = {};
  if (typeof list_currencies != "undefined") {
      currencies = Object.values(list_currencies);
      JSON.stringify(currencies);
      // currency = currencies.match()
      // console.log(typeof currencies);
      // console.log(Object.values(currency));
  }


  var country = {
    id: index + 1,
    name: countries[index].name.common,
    code: countries[index].fifa,
    capital: countries[index].capital,
    languages: languages,
    area: countries[index].area,
    population: countries[index].population,
    currencies: currencies,
    region: countries[index].region,
    subregion: countries[index].subregion,
    timezones: countries[index].timezones,
    flags: countries[index].flags.png,
    map: countries[index].maps.googleMaps,
  };
  updatedCountries.countries.push(country);
}
// var fs = require("fs");
// fs.writeFile(
//   "countries.json",
//   JSON.stringify(updatedCountries),
//   function (err) {
//     if (err) throw err;
//     console.log("complete");
//   }
// );
