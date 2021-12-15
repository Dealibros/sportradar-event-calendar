## Coding Exercise for SportRadar - Coding Academy

## Description

The Goal is to implement a calendar for sport events.

In this calendar you will have the ability to create new Events.

The events can be categorized based on the sports class they belong to.

## Requirements

1. Database Diagram (ERD) that should cover all tables and their relations.

## ERD Screenshot
![ERD](https://user-images.githubusercontent.com/77852951/145813320-61e19775-1c7c-4d1f-b629-400b90b279ec.jpg)

2. A database following the structure of the ERD.

- Database connection

- SQL query

- Data Output

3. A HTML frontend to display the data in a user-friendly way. 

![sport-calendar](https://user-images.githubusercontent.com/77852951/146259716-35d54367-61b9-4a03-9d67-a150edf57c77.jpg)

## Technologies
The application will be built using the following technologies:

- Next.js
- React.js
- PostgreSQL
- Figma

## Libraries
- ley
- date-fns
- fontawesome


## Set Up

The Database used in this challenge was PostgreSQL.

## Steps to follow for the Database set up

Install postgreSQL. <br/>
Create postgres database: <br/>
CREATE DATABASE sportradar_event_calendar; <br/>
CREATE USER sportradar_event_calendar WITH ENCRYPTED PASSWORD ‘sportradar_event_calendar'; <br/>
GRANT ALL PRIVILEGES ON DATABASE sportradar_event_calendar TO sportradar_event_calendar; <br/>

To start the Database and create the events table: <br/>
psql -U sportradar_event_calendar; 

CREATE TABLE or<br/>
install ley library 
after creating a migrations folder in the project's root.

yarn add ley

To get access to already existing migrations <br/>

$ npm run migrate up or <br/>
$ yarn migrate up

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



