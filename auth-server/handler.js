const { google } = require("googleapis");
const calendar = google.calendar("v3");
// Scope is that selected when we registered the app with Google in the API console
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
/* Credentials are those provided by Google when we registered the app, referenced here as the process
environment variables that we entered in the serverless file, which in turn reference the config file */
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: "https://Penny167.github.io/meet/",
  javascript_origins: ["https://Penny167.github.io", "http://localhost:3000"],
};
// Using destructuring to extract values needed from credentials
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris
);

// This function returns a URL with an authorization code when a user authorizes the app via Google
module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ authUrl: authUrl })
  };
};

/* This function takes the authorization URL, extracts the code, then uses this to get the access 
token from Google that is needed to authorise requests to the Calendar API */
module.exports.getAccessToken = async (event) => { 
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
  );
  // Decode authorization code extracted from authorization URL retrieved using getAuthURL
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
  .then((token) => {
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(token)
    }
  })
  .catch((err) => {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  })
}

// This function uses the token to send a GET request to the Calendar API to get the list of events
module.exports.getCalendarEvents = async (event) => {
// Create new oAuth2Client
  const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris
  );
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
// Set client credentials using token
  oAuth2Client.setCredentials({ access_token }); 
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime"
      },
      (err, response) => {
        if (err) {
          return reject(err)
        }
        return resolve(response)
      }  
    );
  })
  .then((response) => {
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ events: response.data.items })
      }
  })
  .catch((err) => {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  })
}