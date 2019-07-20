[![Coverage Status](https://coveralls.io/repos/github/danndav/TransportFare/badge.svg?branch=ft-167060869-sign-up-user)](https://coveralls.io/github/danndav/TransportFare?branch=ft-167060869-sign-up-user) [![Build Status](https://travis-ci.com/danndav/TransportFare.svg?branch=develop)](https://travis-ci.com/danndav/TransportFare) [![Maintainability](https://api.codeclimate.com/v1/badges/f7ae64c94c1e3dce9f27/maintainability)](https://codeclimate.com/github/danndav/TransportFare/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f7ae64c94c1e3dce9f27/test_coverage)](https://codeclimate.com/github/danndav/TransportFare/test_coverage)

# TransportFare

WayFarer is a public bus transportation booking server. You are required to develop the back-end API.

## Access running application

- [HEROKU](https://transportfare.herokuapp.com/)
- [Pivotal Tracker board](https://www.pivotaltracker.com/n/projects/2358604)
- [Docs](https://transportfare.herokuapp.com/docs)

## Features
 
- User can sign up.
- User can sign in.
- Admin can create a trip.
- Admin can cancel a trip.
- Both Admin and Users can see all trips.
- Users can book a seat on a trip.
- View all bookings. An Admin can see all bookings, while user can see all of his/her
bookings.
- Users can delete their booking.

## Optional Features

- Users can get a list of filtered trips based on origin.
- Users can get a list of filtered trips based on destination.
- Users can specify their seat numbers when making a booking.

## Endpoints

| Request Type | Endpoint                                 | Action :arrow_upper_right:                  |
| ------------ | ---------------------------------------- | --------------------------------            |
| POST         | _/api/v1/auth/signup_                    | Signup a user                               |
| POST         | _/api/v1/auth/sigin_                     | Login a user                                |
| POST         | _/api/v1/trips_                          | Create a trip                               |
| POST         | _/api/v1/buses_                          | Create a bus                                |
| GET          | _/api/v1/trips_                          | Get all trip                                |
| POST         | _/api/v1/bookings_                       | Create a Seat on a trip                     |  
| GET          | _/api/v1/bookings_                       | Get all Bookings                            |
| DELETE       | _/api/v1/bookings/:bookingId_            | Delete a booking                            |
| PATCH        | _/api/v1/trips/:tripId_                  | Cancel a Trip                               |
| PATCH        | _/api/v1/bookings/:tripId_               | change booking seatNumber                   |
| GET          | _/api/v1/trips/search_                   | Get all Trips by origin and destination     |

## Getting Started

Instructions to get the project running successfully on your terminal

### Prerequisites

You need to have these installed before cloning the project

- [Nodejs](https://nodejs.org/en/download/)

### Technologies Used

- [NodeJS](https://nodejs.org)
- [Express](https://expressjs.com)
- [Mocha](https://mochajs.org)
- [Chai](www.chaijs.com)
- [istanbul](https://istanbul.js.org)
- [Eslint](https://eslint.org/)
- [Babel](https://babeljs.io/)
- [Covealls](https://coveralls.io/)

## Style Guide

:smile: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/)

## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
2. Clone the [**repository here**](https://github.com/danndav/TransportFare.git)
3. [**cd**] into the root of the **project directory**.
4. Run `npm install` on the terminal to install Dependecies
5. run `npm start` on the terminal to start the application

```
cd TransportFare

npm install

npm start
```

## Testing

Testing is used at key checkpoints in the overall process to determine whether objectives are being met. It also speed up software development process

Sever side tests - Run `npm test` on the terminal while within the \*\*project root

## Acknowledgments

:clap: :clap: :clap: :clap: :+1: :+1: :smile:

- [Andela](http://andela.com)


## Author

:large_blue_circle: :persevere: [David Imodoye Daniel](https://github.com/danndav/TransportFare)

## License

This project is licensed under the **MIT** License
