# React Project

## App details

The application was bootstraped using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). 

## Fake REST API

The only already installed dependency is the [JSON server](https://github.com/typicode/json-server) (development dependency), a "fake" REST API. This API exposes 3 different resourses (stats, courses and instructors) and you can view it on `db.json` file. 

## Run locally

```
npm install
npm run api // Runs API server in port 3001
npm start // Runs the create react app server in port 3000
open http://localhost:3000
```

## User stories

### Dashboard page

The dashbord page must contain:

1. Cstats (students, courses, instructors and events)
2. a list with the 4 courses
3. every course must have a link that leads to the course details page
4. a link that leads to the courses page

#### Dashboard (sample)


### Courses page

The courses page must contain:

1. all the available courses
2. every course must have a link that leads to the course details page

#### Courses Page (sample)


### Course details page

The course details page must contain:

1. all the details of the course
2. all the course instructors

#### Courses Details Page (sample)

### Add new course page

The add new course page must contain:

1. a form with the appropriate course fields
2. a submit button that posts the data correctly

#### Add new course page (sample)


