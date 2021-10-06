import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  
  state = { 
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: ''
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({ 
        query: value,
        infoText: "No events found. Please try another city"
      });
    } else {
      this.setState({ 
        query: value,
        suggestions: suggestions,
        infoText: ''
      });
    }
  }

  handleItemClicked = (suggestion) => {
    this.setState({ 
      query: suggestion,
      suggestions: [], 
      showSuggestions: false,
      infoText: '' 
    });
    this.props.updateEvents(suggestion, null);
  }

  render() {
    return(
      <div className="CitySearch">
        <InfoAlert text={this.state.infoText} />
        <p>Choose your nearest city:</p>
        <input className="city" type="text" placeholder="Search for a city" value={this.state.query} onChange={this.handleInputChange}
          onFocus={() => this.setState({ showSuggestions: true })}>
        </input>
        <ul className="suggestions" style={{ display: this.state.showSuggestions ? "block" : "none"}} >
          {this.state.suggestions.map((suggestion)=> {
            return <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
          })}
          <li key="All cities" onClick={() => this.handleItemClicked("All cities")}><b>See all cities</b></li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;