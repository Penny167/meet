import { loadFeature, defineFeature } from 'jest-cucumber';
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('When user hasn’t specified a number, 12 is the default number', ({ given, when, then }) => {
    given('a user hasn’t specified the number of events', () => {

    });

    when('the list of events is displayed', () => {

    });

    then(/^the default number of events is (\d+)$/, (arg0) => {

    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the list of events is displayed', () => {

    });

    when('the user enters the number of events that they want to see', () => {

    });

    then('the number of events changes to match the number selected by the user', () => {

    });
  });
  
});