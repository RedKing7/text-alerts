# text-alerts

This app lets you create alerts, giving a date/time to send them at and a message that they will be sent with.
Once created, the alerts will be texted to you once the date/time they were set for arrives.

## Technologies Used
  - [Ruby on Rails](http://rubyonrails.org/) 5.1.4
  - [React](https://reactjs.org/) and react-router-dom
  - [Axios](https://www.npmjs.com/package/axios) for api calls
  - [Twilio API](https://www.twilio.com/) for sending alerts
  - [Authy API](https://authy.com/) for phone verification
  - [delayed_jobs](https://github.com/collectiveidea/delayed_job/tree/v4.1.3) to handle asynchronous sending of alerts
  - [Styled Components](https://www.styled-components.com/)

### Steps to set up
1. clone this repository and `cd` into it
2. run `bundle install`
3. `cd client` and run `npm install` then `cd ..`
4. Create a `.env` file in the root directory, with the same variable names in `.env.sample`
4. Make a Twilio account
  - add twilio SID, auth-token, and phone number to the `.env` file
5. Make an authy app
  - add your authy api key to the `.env` file
6. In the home directory, run `foreman start -f Procfile.dev`


## Trello board
https://trello.com/b/BmX9niuW/project-4

## ERD's
![oops! look in diagrams/ERDs.png for the image that should be here](/diagrams/ERDs.png?raw=true "ERD")

## Wireframe
![oops! look in diagrams/Wireframe.png for the image that should be here](/diagrams/Wireframe.png?raw=true "Wireframe")

## Deployed Heroku link
https://text-alerts-wdi12.herokuapp.com/
