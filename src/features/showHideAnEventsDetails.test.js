import { loadFeature, defineFeature } from 'jest-cucumber';
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user hasn’t selected an event', () => {

    });

    when('a list of events is displayed', () => {

    });

    then('the event elements will be collapsed so that no details are shown', () => {

    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('a list of events is displayed', () => {

    });

    when('the user selects an event to see further information', () => {

    });

    then('the event expands to show the event details', () => {

    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('an event is expanded to show its details', () => {

    });

    when('a user selects an event to hide its details', () => {

    });

    then('the event will collapse so that only high level event information is shown', () => {

    });
  });

});