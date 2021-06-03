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
![Spot Search](https://github.com/mike4344/SpairBnB/blob/main/frontend/public/spairbnb2.png?raw=true)

### Users can view images, spot description all from the map
![Spot Window](https://github.com/mike4344/SpairBnB/blob/main/frontend/public/spairbnb1.png?raw=true)

### Users can review spots
![Spot Reviews](https://github.com/mike4344/SpairBnB/blob/main/frontend/public/spairbnb3.png?raw=true)

## Pushing to Heroku
```
git push heroku main:master
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all
```
