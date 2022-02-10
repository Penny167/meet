# Meet app

![screenshot](MeetApp.png) 

Meet app is a progressive, serverless web application that uses the Google Calendar API to provide information about educational events to full-stack developers. Users can filter events by location, expand events to see detailed descriptions and view summary event information using charts.

The coding objectives of this project were to:
- Build a simple React app using a test-driven approach
- Set up and configure a cloud-based server to perform user authentication and authorisation using OAuth2.0

Information about the testing approach, test runner, packages and files is included in the Testing section below. The Installation and set up section details the steps followed to register the app with Google and to set up the cloud server with AWS Lambda.

Note that as this project was built for educational purposes the events fetched from the Google Calendar are fictitious. 

## Live website

Visit Meet app [here](https://penny167.github.io/meet/)

## Key features

- Meet app displays a list of upcoming developer events, showing for each event: the title, date, time, location and a contact email. A "Show details" button toggles a full event description and a link to the details on the user's Google calendar (illustrated above).
- By default 12 events are displayed from across all locations. Users can search for specific event locations and specify the number of events that they wish to see displayed by typing their selections in to input boxes located above the events list. 
- A progress bar appears whilst the page updates to reflect user selections.
- Alerts are displayed to notify the user if a location requested does not exist, if the requested number of events exceeds the number of events available for the location specified and if the requested number of events exceeds the maximum number that the page can display. 
- In addition to the events the app displays two charts implemented using Recharts. A pie chart shows the events summarised by subject area and a scatter chart shows the number of events by location. The charts update when the user selects a location of interest and/or changes the number of events that they wish to see displayed.
- Meet app is progressive and can be used offline where it will display events cached during the most recent visit. An alert indicates to the user when they are working offline.
- The app is responsive and adjusts automatically to fit the screen size available.
- The app uses OAuth2.0 to implement efficient user authentication and authorisation. On visiting the welcome page users click to sign in with Google and provide consent to access their Google calendar. This completes the authorisation process and takes users directly to the main page displaying the events.
- The cloud-based server that handles the authorisation process is hosted by AWS Lambda. The framework Serverless was used to configure the endpoints and deploy the event handlers.
- Meet app is published to Github pages and is accessible using the live website link above. 

## Technologies used

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

- A set of features, user stories and scenarios was created up front as the basis for the development of the app components. These are contained in the features files that reside within the features directory, with one file per feature. 
- The test runner Jest was used to perform unit and integration tests on the components. The files for these tests are located inside the tests directory. Acceptance testing was performed using jest-cucumber. The acceptance testing files are located inside the features directory alongside the features files. One feature was also tested end-to-end using Puppeteer and this file is located in the tests directory.
- The package Enzyme was used to facilitate shallow and full rendering of components for test purposes. Enzyme requires an adapter to be compatible with React v17 and this is imported and configured within the setupTests.js file.  
- Create-react-app incorporates Jest by default. The other testing packages were installed using NPM and are included in the package.json file as dev dependencies.
- Note that testing focused solely on the core functionality of the app as described in the features files and summarised in the first two Key Features described above.

To run the test files use the command: 
```
npm run test
```

## Installation and set up

This project requires Node.js to be installed. The documentation can be found [here](https://nodejs.org/en/).

To install Meet app run: 
```
npm install
```
Navigate to the auth-server directory and run the command again. This will install the modules required by files inside the auth-server specifically.

At this stage your local repository should contain: 
- The Meet app files and node modules required to build the project components
- A handler.js file containing the serverless functions used to handle the OAuth process
- A serverless.yml file where the authorisation server endpoints are configured. 

**In order to recreate the project in full using data from the Google Calendar API and implementing the OAuth process, you will need to complete the following additional steps:** 
- Set up your project on Github and use github pages to provide a live website URL for your app
- Register your app with Google to obtain OAuth credentials
- Set up an authorisation server with AWS Lambda and (re)deploy the serverless functions
- Save the reconfigured files to github and deploy to the live website

The detailed instructions for these steps are as follows:

**Setting up the project and generating a URL**<br>
- Create a github repository for your project. This will allow you to use github pages to create the live website that will host the app and interact with the authorisation server. Your github pages URL will be: https://your_github_username.github.io/your_repository_name.
- Replace the homepage URL in the package.json file with your github pages URL. 
- In the auth-server directory handler.js file, update the credentials object properties: redirect_uris (including / at the end of the URL) and javascript_origins. 
- In the WelcomeScreen.jsx file, update the href for the privacy policy. 
- Initialize git in the project directory, add your repository URL and push the changes.
The gh-pages package is already installed and configured to publish your app to the live website when the project is deployed.


**Registering the app with Google**<br>
- To implement OAuth2.0 and access the Google Calendar API, you must first register your app with Google to obtain the credentials that are required during the authorisation process.
- Navigate to the [Google developers console](https://console.developers.google.com). Click create project, name your project, click create. Select enable APIs and services, search for and select the Google Calendar API, enable it.
- Now you need to set up credentials. Click create credentials and select the following options: Google Calendar API, called from a web browser using JavaScript, accessing user data, external users. Click create.
- Next complete the OAuth consent screen where you will provide your contact details as the developer responsible for the app. Add yourself as a test user. Then complete the scopes section: select ../auth/calendar.readonly. Click update then save and continue.
- Now create your OAuth client ID: complete the fields specifying web app and your app name. For authorized JavaScript origins enter the domain from your github pages site URL. For the authorized redirect URIs use the full github pages URL with / at the end (this mirrors the changes you made to the handler.js file above so everything is now pointing to your own github pages website). Click create. Your credentials will now be available to download and will also be available on the credentials page of your google console.
- Finally **inside the auth-server directory** create a config.json file. Inside the file, add the following object, replacing the values with the credentials you obtained from Google and your project ID (you will find the project ID on your Google dashboard):<br>
{
  "CLIENT_ID": "YOUR_GOOGLE_CLIENT_ID",<br>
  "PROJECT_ID": "YOUR_GOOGLE_PROJECT_ID",<br>
  "CLIENT_SECRET": "YOUR_GOOGLE_CLIENT_SECRET",<br>
  "CALENDAR_ID": "fullstackwebdev@careerfoundry.com"<br>
}<br>
This file is already included within the .gitignore file so your credentials will remain secure.


**Setting up the remote authorisation server**<br>
- At this stage the project already contains an auth-server directory and the serverless functions needed to manage the authorisation process. The functions now need to be deployed to your own AWS Lambda remote server.
- Start by creating an Amazon Web Services account [here](https://aws.amazon.com/lambda/?c=ser&sec=srv)
- Log in to the management console, click on your username and select My Security Credentials from the dropdown menu.
- Select Access keys (access key ID and secret access key) then click Create New Access Key. Download the key file and store it in a safe place. This contains both your Access Key ID and Secret Access Key.
- The framework Serverless is used to deploy the serverless functions in the auth-server directory to your AWS remote server. To install Serverless globally, open a terminal and run:
```
npm install -g serverless
```
- Now **inside the auth-server directory** delete the .serverless folder. You will recreate this when the functions are (re)deployed to your own AWS account.
- Still in the auth-server directory run the following command **replacing the values with the Access Key ID and Secret Access Key that you just retrieved from AWS:**
```
serverless config credentials --provider aws --key YOURACCESSKEYID --secret YOURSECRETKEY
```
- Finally, to deploy the serverless functions to your remote server remain inside the auth-server directory and run:
```
serverless deploy
```

**Saving the reconfigured files to github and deploying to the live website**<br><br>
By this stage your local files should be configured to run the app using your new cloud-based server and hosted on the live website URL linked to your github repository. To deploy the app, commit all of your changes and push to your main github branch then run:
```
npm run deploy
```
Your app should now be live at your github pages URL!

## Future features
- The focus of this project was on developing functionality using a test-driven approach therefore basic styles have been used for the initial release. The next release will use React-Bootstrap to build a more sophisticated UI.
- Apps registered with Google are considered to be in test and display a warning until a full verification process has been completed. Google verification will be sought on completion of the updated UI.

## Author
Github: [@penny167](https://github.com/Penny167)
