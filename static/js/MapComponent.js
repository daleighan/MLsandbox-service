import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    onClick={props.handleMapClick.bind(this)}
    options={{
      mapTypeControl: false,
      panControl: false,
      streetViewControl: false,
      gestureHandling: 'none',
      zoomControl: false,
      scrollwheel: false,
      draggable: false
    }}
    defaultZoom={12}
    defaultCenter={{ lat: 47.595582, lng: -122.249828 }}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
))

export default MapComponent;
