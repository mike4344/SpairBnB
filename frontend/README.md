
git push heroku main:master
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all
