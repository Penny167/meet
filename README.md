# Meet app

Meet is a serverless, progressive web application built using React that uses the Google Calendar API to fetch events and displays them to users. Users can filter results based on locations of interest, expand results to see event details and view information graphically as well as in list form. 

The main focus for this project was to practice developing a simple app using a test-driven approach. A full set of features, user stories and scenarios was created up front as the basis for the development work and these are included below. The test files are located inside the src folder: unit and integration tests inside the tests directory and acceptance tests inside the features directory. One feature was also tested end-to-end using Puppeteer and this file is located in the tests directory.

A secondary objective was to practice using serverless functions (with AWS Lambda), in this case to manage the OAuth2 authentication process required to get access to the Google Calendar API, which contains the events data used in the app. Note that as this project was designed for educational purposes, the events are not real and occur in the past.

Finally the app was converted to a progressive web app using a manifest file and service worker, before being deployed using github pages.

## Overview of main features

On first visiting the app, the user is presented with a welcome screen and invited to sign in to the app using Google. This initiaties the authentication process, following which the main app screen is displayed. This contains input boxes where users can select locations and the number of events that they would like to see displayed.

By default the app displays 12 events from across all locations. The view also displays two charts: a pie chart showing the events by genre, and a scatter chart showing the events split by location. The charts update when the user selects a location of interest and/or changes the number of events that they wish to see displayed.

Alerts are displayed if the users types a location that does not exist, if they request a number of events in excess of the maximum (32), if they request a number of events in excess of that available for the selected location, and if they are working offline.

Below the charts is a list of the events returned for the location selected. These are collapsed by default to display summary information but can be expanded by clicking the "show details" button to provide additional details.

The app is responsive and will adjust automtically to fit the screen size available.

The app is progressive and can be used offline, where it will display events cached during the most recent visit.

## Installation

The project can be cloned from the project repository on github. Packages can then be installed using npm install.

## Overview of main packages used

The project was created using create-react-app as the build tool. 

Create-react-app incorporates the test runner Jest by default. In addition the package Enzyme was used, which specifically facilitates testing of React components, allowing them to be rendered "shallowly" in isolation for unit testing and fully rendered for integration testing. Enzyme requires an adapter to be compatible with React v17 and this is imported and configured within the setupTests.js file.

After the components were developed, acceptance tests were performed using jest-cucumber. Finally one feature was tested end to end using Puppeteer. 

The framework Serverless was used to develop and deploy the serverless architecture, which is used within the project to manage the user authentication process. Serverless was installed globally so is not included in the package.json file. The AWS template in Serverless was used to create an "auth-server" directory, which contains the files where the serverless functions were created and configured.

AWS provides an access key ID and secret key that are required to configure Serverless to deploy functions directly to AWS. They can be obtained via the AWS management console.

The Serverless functions manage the authentication process with Google under the OAuth 2 protocol, whereby users can authorise the app to access the Google Calendar API by virtue of their Google credentials. The app must first be registered with Google, during which process Google will provide app credentials. These must be stored in a config.json file within the "auth-server" directory. This file has been added to the project .gitignore to keep the credentials secret.

The package Googleapis was installed within the "auth-server" directory and used to create the functions that direct the app to the required Google API endpoints.

In addition to the key packages described above, the following were also used: axios was used to send requests to the API, atatus has been used to monitor app performance, nprogress is used to display loading status for the events, and finally recharts has been used to build 2 charts to display event information visually.

Comments have been used throughout to explain more complex areas of the code.

## App features and user stories used in development

Key Features:
- User can filter events by city
- App can show/hide event details
- User can specify number of events to display
- App can be used when offline
- App shortcut can be added to home screen
- User can view chart showing number of upcoming events by city

User stories and scenarios:
1. As a user, I should be able to filter events by city, so that I can see the list of events that will take place in that city.

  Scenario 1: When a user hasn’t searched for a city, show upcoming events from all cities.
  
  Given the user hasn't searched for any city, when the user opens the app, then the user should see a list of upcoming events from all locations.

  Scenario 2: User should see a list of suggestions when they search for a city.
  
  Given the main page is open, when a user starts typing in the city textbox, then the user should see a list of cities (suggestions) that match what they’ve typed.

  Scenario 3: User can select a city from the suggested list.
  
  Given the user has typed a city name and a list of suggestions is showing, when the user selects a city from the list, then their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city.

2. As a user, I should be able to show or hide an event’s details, so that I only need to see details of an event that I’m interested in.

  Scenario 1: An event element is collapsed by default.
  
  Given the user hasn’t selected an event, when a list of events is displayed, then the event elements will be collapsed so that no details are shown.

  Scenario 2: User can expand an event to see its details.
  
  Given a list of events is displayed, when the user selects an event to see further information, then the event expands to show the event details.

  Scenario 3: User can collapse an event to hide its details.
  
  Given an event is expanded to show its details, when a user selects an event to hide its details, then the event will collapse so that only high level event information is shown.

3. As a user, I should be able to select the number of events that I want to see, so that I can adjust the amount of information I am presented with to suit my preferences.

  Scenario 1: When user hasn’t specified a number, 12 is the default number.
  
  Given a user hasn’t specified the number of events that they want to see, when the list of events is displayed, then the default number of events is 12.

  Scenario 2: User can change the number of events they want to see.
  
  Given the list of events is displayed, when the user enters the number of events that they want to see,then the number of events changes to match the number selected by the user.

4. As a user, I should be able to use the app when offline, so that I can keep track of events in which I’m interested, even when I don’t have an internet connection.

  Scenario 1: Show cached data when there’s no internet connection.
  
  Given the user is offline, when the user accesses the app, then the main features of the app are still available using events cached during the last online session and an alert will notify the user that this is the case.

5. As a user, I should be able to see event data presented graphically in addition to seeing it in list form, so that I can more easily digest the information at a summary level.

  Scenario 1: When the app is launched, show a chart with the number of upcoming events in each city
  
  Given the user hasn’t selected a city, when the app is launched, then a chart with the number of upcoming events in each city is displayed.
