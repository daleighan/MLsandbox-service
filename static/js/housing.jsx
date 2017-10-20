import React, { Component } from 'react';
import Axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import mapKey from '../../mapsapi.js';

class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: { lat: 59.95, lng: 30.33 },
      zoom: 11,
      lat: 47.5112,
      lng: -122.27
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
    Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lng}&sensor=false`)
    .then((result) => {
      let addy = result.data.results[0].formatted_address;
      let zip = addy.slice(addy.length - 10, addy.length - 5);
      console.log(zip);   
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
          zip,
          this.state.lat,
          this.state.lng,
          this.state.livingSpace,
          this.state.lotSize] 
      }).then(results => console.log(results))
      .catch(err => console.log(err));
    });
  }

  handleMapClick = (e) => {
    console.log(e);
    this.setState({ lng: e.latLng.lng() }, () => {
      this.setState({ lat: e.latLng.lat() });
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
        <div>
          <MapComponent
             lat={this.state.lat}
             lng={this.state.lng}
             handleMapClick={this.handleMapClick}
             googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=3.exp&libraries=geometry,drawing,places`}
             loadingElement={<div style={{ height: `100%` }} />}
             containerElement={<div style={{ height: `400px` }} />}
             mapElement={<div style={{ height: `100%` }} />}
           />
        </div>
      </div>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap((props) => 
  <GoogleMap
    onClick={props.handleMapClick.bind(this)}
    options={{
      mapTypeControl: false,
      panControl: false,
      streetViewControl: false,
      zoomControl: false
    }}
    defaultZoom={13}
    defaultCenter={{ lat: 47.5112, lng: -122.257 }}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
))

export default Housing;
