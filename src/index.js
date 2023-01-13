const { getIncidents } = require("pulsepoint");
const haversine = require("./math");
const mailAlert = require("./mail");

const config = require("../config.json");

const notified = new Set();

const checkIncidents = async () => {
  const incidents = await getIncidents(config.agencies);

  incidents.active.forEach((incident) => {
    if (notified.has(incident.id)) return;

    const distance = haversine(incident.coordinates, config.alertRegion.center);

    if (distance <= config.alertRegion.radius) {
      console.log(`🚨 Incident ${incident.id} is ${distance} miles away`);

      notified.add(incident.id);
      mailAlert(incident, distance);
    }
  });
};

setInterval(checkIncidents, config.checkInterval * 60 * 1000);
