import { gapi } from "gapi-script";

const CLIENT_ID ="752992279153-purefqeiieioup946cdbm8s6ecgcam30.apps.googleusercontent.com";
const API_KEY ="AIzaSyC0AaXAqu2LQDgOgGINByJF9nFOtwYzb1I";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initClient = () => {
  return gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  });
};

export const addEventToCalendar = (event) => {
  return gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
};

export const signIn = () => {
  return gapi.auth2.getAuthInstance().signIn();
};

export const signOut = () => {
  return gapi.auth2.getAuthInstance().signOut();
};