import React, { Component } from 'react';

class CitySearch extends Component {
  state = { 
    query: '',
    suggestions: []
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
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