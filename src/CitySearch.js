import React, { Component } from 'react';

class CitySearch extends Component {
  state = { 
    query: '' 
  }
  render() {
    return(
      <div className="CitySearch">
        <input className="city" type="text" value={this.state.query}></input>
        <ul className="suggestions"></ul>
      </div>
    );
  }
}

export default CitySearch;