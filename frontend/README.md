![Intro]()
# Spair Bnb
## _Map Based Rental App_


Spair Bnb is a Map based loose clone of AirBnb

## Features

- Google Map API for rental spots
- Google Geocoding API for converting the address of a new spot into latitude and longitude and also for searching the Map by moving the center to the latitude and longitude result of the query term.
- Custom Image carousel
- The ability to book, view and rate spots.

## Tech

SpairBnb uses a number of open source projects to work properly:

- ReactJS -
- Express -
- Google Maps API -
- Google Geocoding API -
- AWS S3 -
- Sequelize -
- PostgreSQL -
- Redux -

## Installation

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/mike4344/SpairBnB.git
cd backend
npm install
npm start
cd ..
cd frontend
npm install
npm start

```


## Features


### Users can view and search for spots on the map
![Interview guide]()

### Users can view images, spot description all from the map
![Interview text feedback]()

### Users can review spots
![Interview text feedback]()

## Pushing to Heroku
```
git push heroku main:master
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all
```
