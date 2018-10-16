import React, {Component} from 'react'
import Genres from '../helpers/Genres';
import Autosuggest from 'react-autosuggest'
import logo from '../assets/images/themoviedb_green.svg'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav, NavDropdown, MenuItem, Image, Checkbox } from 'react-bootstrap/lib'

import { URL_SEARCH, API_KEY_ALT, URL_IMG, IMG_SIZE_XSMALL } from '../const';

import '../assets/css/nav.css';
import '../assets/css/search.css';

library.add({faSearch, faFilter})

/**
 * Represents the NavBar class.
 * Here is where the majority of userinterface action happens
 */
class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };

    console.log('constructor')
    this.genres = Genres.getFilterGenres().map((genre, i) => {
      return (
        <MenuItem key={i} onClick={this.handleFilterItemClick}>
          <div className="material-switch">
             <input id={genre.name} name="genreOpt" type="checkbox" key={i}/>
             <label for={genre.name} className="label-default"></label>
             {genre.name}
          </div>
        </MenuItem>
      )
    })
  }

  onChange = (event, {newValue, method}) => {
    this.setState({value: newValue});
  };

  handleKeyDown = (event) => {
    if (event.key == 'Enter') { // eslint-disable-line
      return this.handleSubmit(this.state.value);
    }
  }

  handleSubmit = (searchText) => {
    this.props.dispatch(push('/search/' + searchText));
    this.setState({value: ''});
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  };

  onSuggestionsFetchRequested = ({value}) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length > 0) {
      let url = URL_SEARCH + trimmedValue + API_KEY_ALT;
      fetch(url)
        .then(response => response.json())
        .then(json => json.results)
        .then(data => {
        const results = data.map(movie => {
          let temp = {}
          temp.id = movie.id
          temp.title = movie.title
          temp.img = movie.poster_path
          temp.year = (movie.release_date === "") ? "0000" : movie.release_date.substring(0, 4)
          return temp
        });
        this.setState({suggestions: results});
      }).catch(error => console.log('Exception to get Suggestions'))
    } else {
      this.setState({suggestions: []})
    }
  }

  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  renderSuggestion = (suggestion) => {
    return (<a>
      <img className="search-result-image" src={suggestion.img == null ? logo : URL_IMG + IMG_SIZE_XSMALL + suggestion.img} role="presentation"/>
      <div className="search-result-text">
        <div className="search-result-name">
          {suggestion.title}
        </div>
        <br/>
      </div>
    </a>);
  };

  onSuggestionSelected = (event, {suggestion, method}) => {
    if (method === 'enter')
      event.preventDefault();
    this.props.dispatch(push('/movie/' + suggestion.id));
    this.setState({value: ''});
  };

  handleFilterItemClick = (e) => {
    e.stopPropagation();
  }

  render() {
    const {value, suggestions} = this.state;

    const inputProps = {
      value,
      onChange: this.onChange,
      onKeyPress: this.handleKeyDown,
      placeholder: 'Search movies'
    };

    const searchIconStyle = {
      display: 'inline-block'
    }

    return (<Navbar bsStyle="inverse">
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">
            <Image src={logo} id="logo" key="fade"/>
          </a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullLeft>
        <NavDropdown id="filterGenres" title="Filter Genres">
          {this.genres}
        </NavDropdown>
      </Nav>
      <Navbar.Form pullRight>
        <FontAwesomeIcon icon="search" style={searchIconStyle} />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </Navbar.Form>
    </Navbar>);
  }
}

export default connect()(NavBar);
