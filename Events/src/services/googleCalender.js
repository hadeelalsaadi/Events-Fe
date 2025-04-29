import { gapi } from "gapi-script";

// Access environment variables using import.meta.env
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DISCOVERY_DOCS = [import.meta.env.VITE_DISCOVERY_DOCS || "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = import.meta.env.VITE_SCOPES || "https://www.googleapis.com/auth/calendar.events";



console.log("client id here ", CLIENT_ID)
console.log("Key id here ", API_KEY)
console.log(SCOPES)
// Track initialization state
let isInitialized = false;
let initializationPromise = null;

// Initialize the client properly
export const initClient = async () => {
  // Don't initialize multiple times
  if (isInitialized) return Promise.resolve(true);
  
  // Return existing initialization promise if one is in progress
  if (initializationPromise) return initializationPromise;
  
  // Create a new initialization promise
  initializationPromise = new Promise((resolve, reject) => {
    // First make sure gapi is loaded
    if (!window.gapi) {
      reject(new Error("Google API not loaded"));
      return;
    }
    
    // Now initialize the client
    window.gapi.load("client:auth2", async () => {
      try {
        await window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        isInitialized = true;
        resolve(true);
      } catch (error) {
        initializationPromise = null;
        reject(error);
      }
    });
  });

  return initializationPromise;
};

// Check if user is signed in
export const isSignedIn = () => {
  // First check if gapi exists
  if (!window.gapi) {
    console.log("gapi not loaded yet");
    return false;
  }
  
  // Then check if auth2 is initialized
  if (!window.gapi.auth2) {
    console.log("gapi.auth2 not initialized yet");
    return false;
  }
  
  // Finally, check if getAuthInstance() returns something
  const authInstance = window.gapi.auth2.getAuthInstance();
  console.log("Auth instance:", authInstance);
  if (!authInstance) {
    console.log("Auth instance is null");
    return false;
  }
  
  // Now it's safe to check if signed in
  return authInstance.isSignedIn.get();
};

// Sign in function
export const signIn = async () => {
  try {
    // Make sure client is initialized first
    await initClient();
    
    // Check if already signed in
    if (isSignedIn()) {
      return true;
    }
    
    // Sign in and return the result
    const signInResult = await window.gapi.auth2.getAuthInstance().signIn();
    return !!signInResult;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return false;
  }
};

// Add event to calendar
export const addEventToCalendar = async (event) => {
  try {
    // Make sure client is initialized and user is signed in
    await initClient();
    
    if (!isSignedIn()) {
      await signIn();
    }
    
    // Now add the event
    return await window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
  } catch (error) {
    console.error("Error adding event to calendar:", error);
    throw error;
  }
};

// Sign out function
export const signOut = async () => {
  try {
    // client initializing
    await initClient();
    
    // Sign out
    await window.gapi.auth2.getAuthInstance().signOut();
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
};