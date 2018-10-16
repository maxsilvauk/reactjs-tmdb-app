<h1 align="center">ReactJS TMDB App</h1>
<br>
<p align="center">
  <a href="https://gitpoint.co/">
    <img alt="ReactJS" title="ReactJS" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="310">
  </a>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/npm-v5.6.0-green.svg" />
    <img src="https://img.shields.io/badge/yarn-v1.7.0-green.svg" />
    <img src="https://img.shields.io/badge/node-v9.8.0-green.svg" />
    <img src="https://img.shields.io/badge/react-v15.4.1-green.svg" />
</p>

## Table of Contents

- [Introduction](#introduction)
- [For the developers](#notes)
- [Features](#features)
- [Built With](#built-with)
- [Install](#install)

## Introduction

A React 15.4.1 TMDB movie listing application. Data sourced from [TMDB](https://www.themoviedb.org). This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) which has been built by the ReactJS devs.

## Notes
* The application will require another page load for genres to be populated in dropdown
Reason: the navbar renders the component before it has access to the genres. I have tried to get this to work but for some reason hit a mental block. You can see the first time the genres are loaded genres produces an empty array. The second time it is populated with data.

* Filtering of genres
Not Complete: Due to lack of available time I could not complete this.
Solution: I would loop through the checked genres in the state and call a function that passes the genre name to sort through the movie list result excluding all movies that do not have that genre associated with it.

* Filtering of popularity
Not Complete: Due to lack of available time I could not complete this.
Solution: I would create an array of popularity's and the highest number would become the slider component MAX value. When the user clicks the slider it would call a method which gets the popularity number selected from the slider and stores it in a state. Looping through the existing movie data set any movies with popularity higher than the popularity number selected would be removed from the movie set. The slider could also do with a scale at the bottom in numbers but thats personal preference.

* Hiding the Filters on the movie page.
Not Complete: Due to circumstances I did not have time to finish this.
Solution: In the NavBar I would use this.props.location to detect if the user on a detail page and if so hide the components and not render any logic associated with them.

* API sometimes locks up
Notes: Sometimes you will get a message when refreshing that the API is slow or to retry. This is because you can only have so many requests before TMDB locks down.
Solution: After the first load I would use localStorage for storing the api calls with a timestamp associated. There should be some logic to check on page load to see if the timestamp is less than the one in local storage by 5 minutes this. If so use the data from localStorage else make new API requests.

* CSS / Styling
Notes: Due to lack of time I have not been able to put css into a LESS or SASS format into individual files and used webpack to compile to CSS. Also you may notice components/Poster.jsx has some styling in React. Thats just to show it can be done like this as-well. I would also like to remove the '../' and './' before path names using REACT or webpack.

* Loading Screens
Notes: There is one display message shown when movies are being fetched or there are no movies, genres etc.. However It would be nice to have an error and loading components to make this better.

* Languages file
Notes: A languages object could be created and imported in components then as props to give access to different languages.

* NavBar file
Notes: This file is quite bloated just due to lack of time and could be made more manageable by being separated into components such as FilterGenres, FilterPopularity and Search.

* Poster Component
Notes: This is used in two places the MovieList and MovieDetail but it carry's the same styling this needs to be changed for MovieDetail.

* Movie list
Notes: This could be improved in some media queries I think the text needs resizing. You could also load the images as a fly in one by one instead of the overall fadein effect.

* Mobile size
Notes: The popularity bar could be made to stretch across the whole width with a gutter to the right as it looks a little out of place. This can be said for the search bar at the bottom.

## Features

* Displays a list of movies, each showing their title, genres and poster image.
* Movies are ordered by popularity (most popular first).
* Movies are filterable by multiple genres.
* Movies are filterable by their rating.
* Auto-suggest movie title for search function.
* View detail movie info including poster, trailers

## Technical Notes

* Followed [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
* Responsive design using [React-Bootstrap](https://react-bootstrap.github.io/)
* State management using [React-Redux](https://github.com/reactjs/react-redux)
* Environment set-up using [Create-React-App](https://github.com/facebookincubator/create-react-app)

## Built-With

- Node v9.8.0
- NPM v5.6.0
- Yarn v1.7.0
- ReactJS v15.4.1

## Install

* Clone my Git <a href="https://github.com/maxsilvauk/reactjs-tmdb-app.git">repository</a> into your htdocs.
```
git clone https://github.com/maxsilvauk/reactjs-tmdb-app.git
```
* Move to the reactjs-weather-app root folder.
* Install node dependancies with yarn
```
yarn
```
* Start application
```
yarn start
```
* You will be taken to the application
```
http://localhost:30000
```
* Test application with Jest (Facebook testing suite built on Jasmine) - Need to complete!!
```
yarn test
```
