import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './LocationMap.css';
 
 
class LocationMap extends React.PureComponent {

    state = {
        center: {
            lat: 44.4,
            lng: 26.1
          },
        zoom: 10,
    

    }

 
  render() {
    return (
  
      <div className="Location-Map">
        <GoogleMapReact className="google-map" 
          bootstrapURLKeys={{ key: 'AIzaSyBYlEg-dW1i94xgQ2FC4u9IsLfx1kyFEf8' }}
          center={this.state.center}
          defaultZoom={this.state.zoom}
        >
          
        </GoogleMapReact>
      </div>
    );
  }

  changeLocation = (val) => 
  { 
    this.setState({ center: { ...this.state.center, lat : parseFloat(val.lat), lng: parseFloat(val.lon)} });
  }
}
 
export default LocationMap;