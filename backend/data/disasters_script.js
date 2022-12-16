const fetch = require('request-promise');
const { isSharedArrayBuffer } = require('util/types');
const disasters = require('./disastersraw.json');

async function main() {
    let months = new Map();
    months.set('01', 'January');
    months.set('02', 'February');
    months.set('03', 'March');
    months.set('04', 'April');
    months.set('05', 'May');
    months.set('06', 'June');
    months.set('07', 'July');
    months.set('08', 'August');
    months.set('09', 'September');
    months.set('10', 'October');
    months.set('11', 'November');
    months.set('12', 'December');

    // ADD AFFECTED COUNTRIES LATER
    let updatedDisasters = {};
    updatedDisasters.disasters = [];
    for (let i = 0; i < disasters.totalCount; i++) {

        await fetch(disasters.data[i].href)
            .then((res) => {
                let current =  JSON.parse(res).data[0];

                let desc = "";
                if (typeof(current.fields.profile) !== "undefined") {
                    desc = current.fields.profile.overview;
                }

                let affectedCountries = [];
                let affectedData = current.fields.country;
                for (let j = 0; j < affectedData.length; j++) {
                    affectedCountries.push(affectedData[j].name);
                }
                // current.fields.profile.overview

                let disaster = {
                    id: i + 1,
                    relief_id: current.id,
                    name: current.fields.name,
                    status: current.fields.status,
                    year: current.fields.date.created.substring(0, 4),
                    month: months.get(current.fields.date.created.substring(5, 7)),
                    glide: current.fields.glide,
                    description: desc,
                    disaster_type: current.fields.type[0].name,
                    affected: affectedCountries,
                    primary: current.fields.primary_country.name
                }
                updatedDisasters.disasters.push(disaster);
            }).catch(err => console.log(err));
    }
    const fs = require('fs');
    fs.writeFile("disasters.json", JSON.stringify(updatedDisasters), (err) => {
        if (err) throw err;
        console.log("write complete.");
    })
}

main();