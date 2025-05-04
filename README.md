# Event Manager Frontend

React-based frontend for the Event Manager application with Google Calendar integration.

## 🚀 Live Demo

- Frontend: [Netlify Deployment](https://heventsapp.netlify.app/)

## 📋 Project Overview

The Event Manager frontend provides a user-friendly and accessible interface for interacting with the Event Manager API. Users can sign up as either admins or members, with admins having additional privileges to create and manage events. The application is designed with accessibility in mind, ensuring a good experience for all users, including those with visual impairments and colorblindness.

### Tech Stack

- **Framework**: React.js
- **Build Tool**: Vite
- **Deployment**: Netlify
- **External API**: Google Calendar Integration

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/hadeelalsaadi/Events-Fe.git
cd events

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API endpoint and Google Calendar API key and CLIENT ID and SCOPES and DISCOVERY_DOCS

# Run development server
npm run dev
```

## 🔐 User Authentication

The app implements a simple username-based authentication system:

1. Users can sign up by selecting a username and choosing a role (admin or member) and fill other details
2. No password verification is required in this version
3. User roles determine access to different features:
   - **Admin**: Can create and manage events
   - **Member**: Can view and join events
4. Important : For log in use one of these usernames: 
   -robertjohnson : Admin on supbase
   - christopherlee: member on supbase
## 📆 Google Calendar Integration

The application features Google Calendar integration implemented entirely on the frontend:

- Users can add events to their Google Calendar
- Calendar sync is handled via the Google Calendar API client library
- No backend authentication tokens are required

Implementation steps:
```javascript
// Example of Google Calendar integration
import { gapi } from 'gapi-script';

const addToGoogleCalendar = (event) => {
  const calendarEvent = {
    'summary': event.title,
    'description': event.description,
    'start': {
      'dateTime': event.startDate,
      'timeZone': 'America/Los_Angeles'
    },
    'end': {
      'dateTime': event.endDate,
      'timeZone': 'America/Los_Angeles'
    }
  };

  gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': calendarEvent
  }).execute(callback);
};
```

## 📱 Key Features

- **Responsive Design**: Works on desktop /iPad Pro
- **User Role Management**:
  - Admin dashboard for event management
  - Member view for event participation
  - view event details
- **Event Management**:
  - Create events (admin only)
  - View event details
  - Join events
 
- **Calendar Integration**:
  - Add events to Google Calendar
  - an alert tell user to check thier calender
- **Accessible User Interface**:
  - Intuitive navigatio
  - Responsive event cards
  - High contrast colors (black/white text) for colorblind user
  - Screen reader compatible with semantic HTML elements

```

## 🚀 Deployment on Netlify

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables:
   - `VITE_API_URL=https://your-event-api.onrender.com`
   - `VITE_GOOGLE_API_KEY=your_google_api_key`
5. Deploy

## 🛠️ Future Improvements

- Implement proper authentication with JWT
- Enable event sharing on social media
- Implement real-time notifications
- Add dark/light theme toggle with maintained accessibility
- Create mobile app version ,using TailWind
- Further enhance accessibility features with ARIA attributes
- Implement keyboard navigation improvements

