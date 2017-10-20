import React, { Component } from 'react';
import Axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import mapKey from '../../mapsapi.js';

class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: { lat: 59.95, lng: 30.33 },
      zoom: 11
    }
  }
  
  handleInputChange = (event) =>  {
    const { value } = event.target;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit = () => {
    Axios.post('/api/houseprices', {
      info: ["2014", 
        this.state.bedrooms, 
        this.state.bathrooms,
        this.state.livingSpace,
        this.state.lotSize,
        this.state.floors,
        this.state.waterfront,
        this.state.view,
        this.state.condition,
        this.state.grade,
        this.state.livingSpace - this.state.basement,
        this.state.basement,
        this.state.yearBuilt,
        this.state.yearRenovated,
        "98178",
        47.5112,
        -122.257,
        this.state.livingSpace,
        this.state.lotSize] 
    }).then(results => console.log(results))
      .catch(err => console.log(err));
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
        Condition(between one and 5)
        <input
          name="condition"
          type="number"
          onChange={this.handleInputChange}
        />
        Grade(quality of housing between 1 and 10
        <input
          name="grade"
          type="number"
          onChange={this.handleInputChange}
        />
        <div onClick={this.handleSubmit} className="btn">Get Prediction</div>
        <MapComponent 
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDx9k-qXJb388-GL6WYNp0anEOcZmMmOn0&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap((props) => 
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644}}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))

export default Housing;
