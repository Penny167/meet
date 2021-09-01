import React, { Component } from 'react';

class CitySearch extends Component {
  state = { 
    query: '' 
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
  }

  render() {
    return(
      <div className="CitySearch">
        <input className="city" type="text" value={this.state.query} onChange={this.handleInputChange}></input>
        <ul className="suggestions"></ul>
      </div>
    );
  }
}

export default CitySearch;