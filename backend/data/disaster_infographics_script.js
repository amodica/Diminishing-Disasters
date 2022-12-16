const fetch = require('request-promise');
const disasters = require('./all_disasters.json');

async function main() {
    let media = {};
    media.infographics = [];

    for (let i = 0; i < disasters.disasters.length; i++) {
        let current = disasters.disasters[i];
        
        let apiString = "https://api.reliefweb.int/v1/reports?appname=apidoc&preset=latest&filter[operator]=AND&filter[conditions][0][field]=disaster.id&filter[conditions][0][value]=" + current.relief_id + "&filter[conditions][1][operator]=OR&filter[conditions][1][conditions][0][field]=format&filter[conditions][1][conditions][0][value][]=Map&filter[conditions][1][conditions][0][value][]=Infographic&fields[include][]=title&fields[include][]=file.url";

        await fetch(apiString)
            .then((res) => {
                let mediaData = JSON.parse(res);
                let pdfString = "";
                if (mediaData.count > 0) {
                    pdfString = mediaData.data[0].fields.file[0].url;
                }
                let mediaObject = {
                    id: i + 1,
                    relief_id: current.relief_id,
                    url: pdfString
                };
                media.infographics.push(mediaObject);
            })
    }
    const fs = require('fs');
    fs.writeFile("disasters_infographics.json", JSON.stringify(media), (err) => {
        if (err) throw err;
        console.log("write complete.");
    })
}

main();