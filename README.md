# Meet app

Meet app is a serverless, progressive web application built using React, that uses the Google Calendar API to fetch information about upcoming educational events for full-stack developers. 

Users can filter the results by location, expand events to see detailed event descriptions, and view summary information about the event subject areas and the number of events by location, using charts.
<br>

![screenshot](MeetApp.png) 

The objectives of this project were:
  - To build a simple react app using a test-driven development approach;
  - To implement a remote authentication server that uses the OAuth2.0 protocol to authenticate users and authorize their requests to the Google Calendar API, using their Google credentials.

Further details about the testing performed can be found in the Testing section below.
An overview of the server implementation is provided in the Installation and Set up section.

Please note that as this project was built for educational purposes, the events themselves are fictitious. 

## Live website

Visit Meet app [here](https://penny167.github.io/meet/)

## Key features

- Meet App displays a list of upcoming developer events showing for each event: the title, date, time, location and a contact email. A "Show details" button toggles a full event description and a link to the details on the user's Google calendar (illustrated above).
- By default, 12 events are displayed spanning all locations. However, users can search for specific event locations and specify the number of events that they wish to see displayed, by typing their selections in to input boxes located above the events list. 
- A progress bar appears whilst the page updates to reflect user selections.
- Alerts are displayed to notify the user if a location requested does not exist, if the requested number of events exceeds the events available for the location specified, and if the requested number of events exceeds the maximum number that the page can display. 
- In addition to the events, the view displays two charts implemented using Recharts: a pie chart showing the events summarised by subject area, and a scatter chart showing the number of events by location. The charts update when the user selects a location of interest and/or changes the number of events that they wish to see displayed.
- Meet app is progressive and can be used offline where it will display events cached during the most recent visit. An alert indicates to the user if they are working offline.
- The app is responsive and adjusts automtically to fit the screen size available.
- OAuth2.0 is used to implement efficient user authentication and authorization. On visiting the welcome page, users simply sign in with Google and provide consent to access their Google calendar. This completes the authorization process and takes users directly to the main app view displaying the events. The process is implemented serverlessly using AWS Lambda to provide the backend. 

## Technologies

- React
- Jest
- Enzyme
- jest-cucumber
- Puppeteer
- Serverless
- Googleapis
- Axios
- Atatus
- nprogress
- Recharts
- gh-pages

## Testing

The test files used during development are located inside two folders within the src directory: "tests" contains the unit and integration tests and "features" 

The test files are located inside the src folder: unit and integration tests inside the tests directory and acceptance tests inside the features directory. One feature was also tested end-to-end using Puppeteer and this file is located in the tests directory. Note that testing focused solely on the first 3 features of the app.

## Installation and Set up

The project can be cloned from the project repository on github. Packages can then be installed using npm install.

Create-react-app incorporates the test runner Jest by default. Enzyme requires an adapter to be compatible with React v17 and this is imported and configured within the setupTests.js file.

The framework Serverless is used to deploy the functions that handle the authentication and authorization requests to the remote server. The functions themselves are created using Google APIs to access the Google calendar API and authenticate users using Google credentials. 

Serverless was installed globally so is not included in the package.json file. The AWS template in Serverless was used to create an "auth-server" directory, which contains the files where the serverless functions were created and configured.

AWS provides an access key ID and secret key that are required to configure Serverless to deploy functions directly to AWS. They can be obtained via the AWS management console.

The Serverless functions manage the authentication process with Google under the OAuth 2 protocol, whereby users can authorise the app to access the Google Calendar API by virtue of their Google credentials. The app must first be registered with Google, during which process Google will provide app credentials. These must be stored in a config.json file within the "auth-server" directory. This file has been added to the project .gitignore to keep the credentials secret.

## Author
Github: [@penny167](https://github.com/Penny167)
