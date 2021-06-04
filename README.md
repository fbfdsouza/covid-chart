# Atlântico Challenge - Covid Chart

This is a project of a small [React](https://reactjs.org) application which is able to show in a friendly and responsive interface some important data based in the current pandemic crisis where data is fed by [COVID19 Public API](https://covid19api.com/).

With this application users can search the following data by country and date interval:

- Total Confirmed Cases
- Total Death Cases
- Total Recovered Cases

## Main resources and technologies involved

- [Webpack](https://webpack.js.org/) for bundling our source files.
- [react-day-picker](https://react-day-picker.js.org/) for showing a modern and elegant date picker.
- [HighCharts](https://www.highcharts.com/) for plotting the API data in a nice and clear graph.
- [Heroku](https://www.heroku.com/) for hosting our aplication.
- [Docker](https://www.docker.com/) for containerization of our application.

## Get it up and running

### With Node and Yarn Installed (Execute this process to the api and client project) .

1 - Install the dependencies

```bash
yarn install
```

2 - Execute the project

```bash
yarn start
```

## Get it up and running with docker

### With Docker installed navigate into the root project folder.

1 - Build the image

```
docker build . -t covidchart
```

2 - Start it

```
docker run -it -p 8000:8000  covidchart
```

3 - Access it on your browser

```
 http://localhost:8000
```

## Deployment:

The application has been deployed on [Heroku](https://www.heroku.com/) in a docker container and can be accessed here:
https://atlanticocovidchart.herokuapp.com/

#### Application Preview

![map_sample](resources/covid-chart.gif)
