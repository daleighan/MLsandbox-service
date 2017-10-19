import React, { Component } from 'react';

class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bedrooms: 0,
      bathrooms: 0,
      livingSpace: 0,
      lotSize: 0,
      floors: 0,
      waterfront: 0,
      view: 0
    }
  }
  
  handleInputChange(event) {
    const value = event.target;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        Number of bedrooms
        <input 
          name="bedrooms"
          type="number"
          onChange={this.handleInputChange}
        />
        Number of bathrooms
        <input
          name="bathrooms"
          type="number"
          onChange={this.handleInputChange}
        />
        Square Feet of Living Space
        <input
          name="livingSpace"
          type="number"
          onChange={this.handleInputChange}
        />
        Lot Size 
        <input
          name="lotSize"
          type="number"
          onChange={this.handleInputChange}
        />
        Floors
        <input
          name="floors"
          type="number"
          onChange={this.handleInputChange}
        />
        Waterfront
        <input
          name="waterfront"
          type="number"
          onChange={this.handleInputChange}
        />
        View
        <input
          name="view"
          type="number"
          onChange={this.handleInputChange}
        />
      </div>
    )
  }
}

export default Housing;
