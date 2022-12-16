const disasters = require('./all_disasters.json');

async function main() {
    let media = {};
    media.icons = [];

    let iconsMap = new Map();
    iconsMap.set("Cold Wave", "/disaster_icons/coldwave.png");
    iconsMap.set("Drought", "/disaster_icons/images/disaster_icons/drought.png");
    iconsMap.set("Earthquake", "/disaster_icons/images/disaster_icons/earthquake.png");
    iconsMap.set("Epidemic", "/disaster_icons/epidemic.png");
    iconsMap.set("Fire", "/disaster_icons/fire.png");
    iconsMap.set("Wild Fire", "/disaster_icons/fire.png");
    iconsMap.set("Flash Flood", "/disaster_icons/flashflood.png");
    iconsMap.set("Flood", "/disaster_icons/flood.png");
    iconsMap.set("Heat Wave", "/disaster_icons/heatwave.png");
    iconsMap.set("Insect Infestation", "/disaster_icons/insectinfestation.png");
    iconsMap.set("Severe Local Storm", "/disaster_icons/severelocalstorm.png");
    iconsMap.set("Snow Avalanche", "/disaster_icons/snowavalanche.png");
    iconsMap.set("Storm Surge", "/disaster_icons/stormsurge.png");
    iconsMap.set("Technological Disaster", "/disaster_icons/technologicaldisaster.png");
    iconsMap.set("Tropical Cyclone", "/disaster_icons/tropicalcyclone.png");
    iconsMap.set("Tsunami", "/disaster_icons/tsunami.png");
    iconsMap.set("Volcano", "/disaster_icons/volcano.png");

    for (let i = 0; i < disasters.disasters.length; i++) {
        let current = disasters.disasters[i];
        
        let iconUrl = "";
        if (iconsMap.has(current.disaster_type)) {
            iconUrl = iconsMap.get(current.disaster_type);
        }
        let mediaObject = {
            id: i + 1,
            relief_id: current.relief_id,
            url: iconUrl
        };
        media.icons.push(mediaObject);
    }
    const fs = require('fs');
    fs.writeFile("disasters_icons.json", JSON.stringify(media), (err) => {
        if (err) throw err;
        console.log("write complete.");
    })
}

main();
