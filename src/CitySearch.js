import React, { Component } from 'react';

class CitySearch extends Component {
  state = { 
    query: '',
    suggestions: []
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

  render() {
    return(
      <div className="CitySearch">
        <input className="city" type="text" value={this.state.query} onChange={this.handleInputChange}></input>
        <ul className="suggestions">
          {this.state.suggestions.map((suggestion)=> {
            return <li key="suggestion">{suggestion}</li>
          })}
          <li key="all"><b>See all cities</b></li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;