import React, {PureComponent} from 'react'
import { DisplayMsg } from '../components';
import Genres from '../helpers/Genres';
import Autosuggest from 'react-autosuggest'
import logo from '../assets/images/themoviedb_green.svg'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap/lib'
import {fetchGenresList} from '../actions';

import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import { URL_SEARCH, API_KEY_ALT, URL_IMG, IMG_SIZE_XSMALL } from '../const';

import '../../node_modules/rc-slider/assets/index.css';
import '../../node_modules/rc-tooltip/assets/bootstrap.css';

import '../assets/css/nav.css';
import '../assets/css/search.css';
import '../assets/css/slider.css';

library.add({faSearch, faFilter})

/**
 * Represents the NavBar class.
 * Here is where the majority of userinterface action happens
 */
class NavBar extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      checkedItems: new Map(),
    };

    this.handleFilterItemClick = this.handleFilterItemClick.bind(this);
  }

  /**
   * Represents componentDidMount()
   * Invoked immediately after a component is mounted.
   * Get all genres.
   */
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchGenresList());
  }

  /**
   * Represents onChange()
   * The state gets updated on ele value change.
   * @param {object} event
   * @param {newValue} string
   */
  onChange = (event, {newValue, method}) => {
    this.setState({value: newValue});
  };

  /**
   * Represents handleKeyDown()
   * If 'enter' is pressed submit the form.
   * @param {object} event - The event.
   */
  handleKeyDown = (event) => {
    if (event.key == 'Enter') { // eslint-disable-line
      return this.handleSubmit(this.state.value);
    }
  }

  /**
   * Represents handleSubmit()
   * Submit the form.
   * @param {string} searchText - The search keyword.
   */
  handleSubmit = (searchText) => {
    this.props.dispatch(push('/search/' + searchText));
    this.setState({value: ''});
  }

  /**
   * Represents getSuggestionValue()
   * Suggestion Title
   * @param {object} suggestion - Movie data.
   */
  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  };

  /**
   * Represents onSuggestionsFetchRequested()
   * API call for fetching the new suggestion.
   * @param {string} value - Movie data.
   */
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

  /**
   * Represents onSuggestionsClearRequested()
   * Clear the suggestion state.
   */
  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  /**
   * Represents renderSuggestion()
   * Build the HTML for search result.
   * @param {object} suggestion - Movie data.
   */
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

  /**
   * Represents onSuggestionSelected()
   * Prevent default browser behavior, dispatch and reset state.
   * @param {object} event
   */
  onSuggestionSelected = (event, {suggestion, method}) => {
    if (method === 'enter') {
      event.preventDefault();
    }

    this.props.dispatch(push('/movie/' + suggestion.id));
    this.setState({value: ''});
  };

  /**
   * Represents handleFilterItemChange()
   * Change state of checkbox
   * @param {object} event
   */
  handleFilterItemClick = (event) => {
    const item = event.target.name;
    const isChecked = event.target.checked;

    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render() {
    const {genres, isFetcing_genres} = this.props;

    if (isFetcing_genres) {
      return (<DisplayMsg/>);
    }

    // Need to fix this.
    // 1. filterItem should be NavItem but that causes issues.
    // 2. The label is empty so does not updat the checkbox once clicked.
    const filterGenres = genres.length > 0 ?
       Genres.getFilterGenres(genres).map((genre, i) => {
        return (
          <li className="filterItem" key={i}>
            <div className="switch">
               <input
                 id={genre.name}
                 name={genre.name}
                 type="checkbox"
                 key={i}
                 onClick={this.handleFilterItemClick}
                 checked={this.state.checkedItems.get(genre.name)} />
               <label htmlFor={genre.name}></label>
               {genre.name}
            </div>
          </li>
        )
      }) : []

    const {value, suggestions} = this.state;

    const filterPopularityLabel = 'Filter Popularity';

    const inputProps = {
      value,
      onChange: this.onChange,
      onKeyPress: this.handleKeyDown,
      placeholder: 'Search movies'
    };

    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const Handle = Slider.Handle;

    const handle = (props) => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };

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
          {filterGenres}
        </NavDropdown>
      </Nav>
      <Navbar.Text>{filterPopularityLabel}</Navbar.Text>
      <Slider
        min={0}
        max={505}
        defaultValue={3}
        handle={handle}
        step={0.5}
      />
      <Navbar.Form pullRight>
        <FontAwesomeIcon icon="search" className="search-icon-style" />
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

function mapStateToProps(state) {
  const {genresList} = state;

  const {items: genres} = genresList; // eslint-disable-line
  return {
    genres
  }
}

export default connect(mapStateToProps)(NavBar);
