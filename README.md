# photo-caption-contest
This is a side project for a codecademy off-plataform project

In this project, I wrote a back-end for a "caption contest" for photos, where users can add captions to a set number of photos, and later (if I ever feel like it), they can vote on user's captions. 

This project is mainly meant to practice authentications, working with databases with sequelize as well as getting to know intricacies of writing back-end

## How to run this project
First you must have
- node
- npm 
- postgresSQL

Here is a basic on running this code locally, considering you already cloned it
- run this for instaling dependecies 
```
npm install 
```
- With a database created, you want to set `.env` with `DB_NAME, DB_USER, DB_PASSWORD,DB_HOST, PORT` and `JWT_SECRET` where at least `DB` stuff is related to your postgres users and database

- run migrations for creating tables (MUST) and seeds for a dummy environment (optional)
```
npx sequelize-cli db:migrate
```
```
npx sequelize-cli db:seed:all
```

- With all set up, just run `npm start` and server will be at chosen port

## What does it do
I wrote a swagger doc for endpoints, request and responses formating. 

With the server running, access the docs at `http://localhost:PORT/api-docs`
