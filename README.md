# Meet app

Meet is a serverless, progressive web application built using React that uses the Google Calendar API to fetch upcoming events and displays them to users. Users can filter results based on locations of interest, expand results to see event details and view information graphically as well as in list form. A full set of features, user stories and scenarios is provided below.

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
  
  Given the user hasn't searched for any city, when the user opens the app, then the user should see a list of ALL upcoming events.

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
  
  Given the user is offline, when the user accesses the app, then they are able to see cached data.

  Scenario 2: Show error when user changes the settings (city, time range).
  
  Given the user is using cached data while working offline, when the user tries to change the app settings for city and time range, then they are presented with an error message explaining that this is not possible while working offline.

5. As a user, I should be able to see event data presented graphically in addition to seeing it in list form, so that I can more easily digest the information at a summary level.

  Scenario 1: Show a chart with the number of upcoming events in each city.
  
  Given the main page is open and the user hasn’t selected a city, when the user selects the option to show event data for all cities as a chart, then a chart with the number of upcoming events in each city is displayed.
