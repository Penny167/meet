Feature: Specify number of events

Scenario: When user hasn’t specified a number, 12 is the default number
Given a user hasn’t specified the number of events
When the list of events is displayed 
Then the default number of events is 12

Scenario: User can change the number of events they want to see
Given the list of events is displayed 
When the user enters the number of events that they want to see
Then the number of events changes to match the number selected by the user