import axios from 'axios';
import mockData from './mock-data';
import NProgress from 'nprogress';

export const extractLocations = (events) => {
  let extractLocations = events.map((event) => event.location);
  let locations = [...new Set(extractLocations)];
  return locations;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken)); // If accessToken is truthy then checkToken is invoked (and the result is stored in the variable, tokenCheck)
  if (!accessToken || tokenCheck.error) { 
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search); // Store search params of URL in new object called searchParams
    const code = await searchParams.get('code'); // Retrieve code parameter from the URL. It will be present if we have been redirected from the consent screen; otherwise there will be no code in the URL.
    if (!code) { // No code means we need to go to the Google consent screen to get the AuthURL
// Use axios to send a get request to the serverless endpoint for the AuthURL request     
      const results = await axios.get('https://4u0nrwzjp5.execute-api.eu-west-2.amazonaws.com/dev/api/get-auth-url');
      const { authUrl } = results.data;
      return (window.location.href = authUrl); // Setting the href to the authURL redirects the page to the AuthURL (which now therefore contains the code)
    }
    return code && getToken(code); // If code is truthy then getToken is invoked using the code as the argument
  }
  return accessToken;
}

export const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}` 
  )
  .then((res) => res.json())
  .catch((error) => error.json());
  return result;
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://4u0nrwzjp5.execute-api.eu-west-2.amazonaws.com/dev/api/token' + '/' + encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);
  access_token && localStorage.setItem("access_token", access_token); // If the access token is returned then we store it in local storage
  return access_token;
};

export const getEvents = async () => {
  NProgress.start();
  if (window.location.href.startsWith("http://localhost")) { // use mock data if running locally
    NProgress.done();
    return mockData;
  }
  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data?JSON.parse(data).events:[]; // I have changed the argument to data (events used in the notes)
  }
  const token = await getAccessToken();
  if (token) {
    removeQuery(); // Resets the URL
    const url = 'https://4u0nrwzjp5.execute-api.eu-west-2.amazonaws.com/dev/api/get-events' + '/' + token;
    const result = await axios.get(url); // this is the actual request to get the calendar events
    if (result.data) {
      let locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

const removeQuery = () => {
    if (!window.history.pushState) { // if no pushState function then there is nothing to do.
      return;
    }
    let newurl = window.location.protocol + "//" + window.location.host + (window.location.pathname || ""); // If there is a pathname then use that, otherwise nothing
    window.history.pushState("", "", newurl);
};