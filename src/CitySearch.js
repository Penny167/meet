import React, { Component } from 'react';

class CitySearch extends Component {
  
  state = { 
    query: '',
    suggestions: [],
    showSuggestions: undefined // Check whether this needs to be undefined to begin with
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({ 
      query: value,
      suggestions: suggestions
    });
  }

  handleItemClicked = (suggestion) => {
    this.setState({ query: suggestion, showSuggestions: false });
    this.props.updateEvents(suggestion, null);
  }

  render() {
    return(
      <div className="CitySearch">
        <input className="city" type="text" value={this.state.query} onChange={this.handleInputChange}
          onFocus={() => this.setState({ showSuggestions: true })}>
        </input>
        <ul className="suggestions" style={{ display: this.state.showSuggestions ? "block" : "none"}} >
          {this.state.suggestions.map((suggestion)=> {
            return <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
          })}
          <li key="all" onClick={() => this.handleItemClicked("all")}><b>See all cities</b></li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;