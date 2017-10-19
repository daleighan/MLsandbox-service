import React, { Component } from 'react';

class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  handleInputChange = (event) =>  {
    const { value } = event.target;
    const name = event.target.name;

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
        Basement Size
        <input
          name="basement"
          type="number"
          onChange={this.handleInputChange}
        />
        Year Built
        <input
          name="yearBuilt"
          type="number"
          onChange={this.handleInputChange}
        />
        Year Renovated
        <input
          name="yearRenovated"
          type="number"
          onChange={this.handleInputChange}
        />
      </div>
    )
  }
}

export default Housing;
