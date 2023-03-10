const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const config = require("../config.json");

const oAuthClient = new OAuth2({
  clientId: config.credentials.clientId,
  clientSecret: config.credentials.clientSecret,
  redirectUri: "https://developers.google.com/oauthplayground",
});

oAuthClient.setCredentials({
  refresh_token: config.credentials.refreshToken,
});

const accessToken = oAuthClient.getAccessToken();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.credentials.email,
    clientId: config.credentials.clientId,
    clientSecret: config.credentials.clientSecret,
    refreshToken: config.credentials.refreshToken,
    accessToken,
  },
});

const formatCoords = (coordinates) => {
  return coordinates[0] + "," + coordinates[1];
}

const mailAlert = (incident, distance) => {
  const dispatchTime = incident.receivedTime.toLocaleTimeString("en-us", {
    timeStyle: "short",
    hour12: false,
  });

  const image = `https://www.mapquestapi.com/staticmap/v5/map?key=${config.credentials.mapQuestKey}&center=${formatCoords(config.alertRegion.center)}&zoom=14&locations=${formatCoords(config.alertRegion.center)}||${formatCoords(incident.coordinates)}|incident-lg&size=600,400&defaultMarker=marker-home&size=600,400&type=dark`
  const html = `<p>A ${incident.type} was dispatched ${distance.toFixed(2)} miles away at ${incident.address} at ${dispatchTime}</p><img src="${image}">`;

  const mailOptions = {
    from: config.credentials.email,
    to: config.mailingList,
    subject: incident.type,
    html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error(err);
    else console.log(info);
  });
};

module.exports = mailAlert;
