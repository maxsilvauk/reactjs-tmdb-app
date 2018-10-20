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

A ReactJS TMDB movie listing application. Data sourced from [TMDB](https://www.themoviedb.org). This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) which has been built by the ReactJS devs.

## Notes
* The application will require another page load for genres to be populated in dropdown
Reason: The NavBar renders the component before it has access to the genres. Potential solution: https://stackoverflow.com/questions/42219577/state-is-empty-in-first-render

* Filtering of genres
Solution: Looping through the checked genres in the state and call a function that passes the genre name to sort through the movie list result excluding all movies that do not have that genre associated with it.
Also: The label needs text to allow once clicked to check or uncheck a checkbox. But it needs to be of a transparent colour using rgba with a span div containing the genre with a higher z-index property overlayed. 

* Filtering of popularity
Solution: Create an array of popularity's and the highest number would become the slider component MAX value. When the user clicks the slider it would call a method which gets the popularity number selected from the slider and stores it in a state. Looping through the existing movie data set any movies with popularity higher than the popularity number selected would be removed from the movie set. The slider could also do with a scale at the bottom in numbers but thats personal preference.

* Hiding the Filters on the movie page.
Solution: In the NavBar I would use this.props.location to detect if the user on a detail page and if so hide the components and not render any logic associated with them.

* API stalls. (Reason why I use a second TMDB key for searching. TMDB locked out making it a pain to dev)
Solution: After the initial app load. We could use localStorage for storing the api calls with a timestamp associated. Then we can compare timestamps and see if has been 5minutes and make a new request.

* CSS / Styling
Notes: LESS/SASS using webpack to compile to CSS. A variables file. Would also like to remove the '../' and './' before path names using REACT or webpack.

* Pagination of movies
Solution: Infinite scoll solution could be implemented to keep loading more pages of movies. Would require back to top button if you scrolled to far down.

* Loading Screens
Notes: This is in place however could be more intuitive. We should have loading and error screens separate not one for all.

* Languages file
Notes: A languages object could be created and imported in components then as props to give access to different languages.

* NavBar file
Notes: This file is quite bloated. Its contents and logic should  be separated into components such as FilterGenres, FilterPopularity and SearchBox.

* Poster Component
Notes: Is used in two places the MovieList and MovieDetail but it has the same styling this needs to be changed for MovieDetail.

* Movie list
Notes: In some widths the poster text size and padding requires altering.

* Mobile view:
Notes: This all needs fine tuning. e.g. slider and search needs to take up more of the width of the viewport.

## Features

* Displays a list of movies, each showing their title, genres and poster image.
* Movies are ordered by popularity (most popular first). (Not complete)
* Movies are filterable by multiple genres. (Not complete)
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
* Testing Jest (TDD/BDD testing can happen in this magical part!)
```
yarn test
```
