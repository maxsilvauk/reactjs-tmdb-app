import React, {Component} from 'react'
import { Navbar, Image } from 'react-bootstrap/lib'
import logo from '../images/themoviedb_green.svg'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Autosuggest from 'react-autosuggest'
import theme from './search.css' // eslint-disable-line
import {URL_SEARCH, API_KEY_ALT, URL_IMG, IMG_SIZE_XSMALL} from '../const';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
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
      fetch(url).then(response => response.json()).then(json => json.results).then(data => {
        const results = data.map(movie => {
          let temp = {}
          temp.id = movie.id
          temp.title = movie.title
          temp.img = movie.poster_path
          temp.year = (movie.release_date === "")
            ? "0000"
            : movie.release_date.substring(0, 4)
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
      <img className="searchResult-image" src={suggestion.img == null
          ? logo
          : URL_IMG + IMG_SIZE_XSMALL + suggestion.img} role="presentation"/>
      <div className="searchResult-text">
        <div className="searchResult-name">
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

  render() {

    const imgStyle = {
      height: '50px',
      width: 'auto',
      paddingTop: '8px',
      paddingLeft: '10px',
      marginTop: '-8px',
      display: 'inline-block'
    };

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

    const searchBoxStyle = {
      display: 'inline-block'
    }

    return (<Navbar bsStyle='inverse'>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/"><Image style={imgStyle} src={logo}/></a>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Form pullRight>
          <FontAwesomeIcon icon="search" style={searchIconStyle} />
          <Autosuggest style={searchBoxStyle} suggestions={suggestions} onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} onSuggestionSelected={this.onSuggestionSelected} onSuggestionsClearRequested={this.onSuggestionsClearRequested} getSuggestionValue={this.getSuggestionValue} renderSuggestion={this.renderSuggestion} inputProps={inputProps}/>
      </Navbar.Form>
    </Navbar>);

  }
}

export default connect()(SearchBar);