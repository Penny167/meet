Feature: Show/hide an event's details

Scenario: An event element is collapsed by default
Given the user hasn’t selected an event 
When a list of events is displayed
Then the event elements will be collapsed so that no details are shown

Scenario: User can expand an event to see its details
Given a list of events is displayed 
When the user selects an event to see further information 
Then the event expands to show the event details

Scenario: User can collapse an event to hide its details  
Given an event is expanded to show its details 
When a user selects an event to hide its details 
Then the event will collapse so that only high level event information is shown