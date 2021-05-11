import React, { Component } from 'react';
import Input from './Input'
import CityViewer from './CityViewer'
import StatsViewer from './StatsViewer'
import './App.css';
import LocationMap from './LocationMap'

export default class App extends Component {
  
  render() {
    return (
      <div className="Body">
        <div className="Container">
          <div className="Header">
            <Input 
              changeImage = {this.changeImage}
              changePrecipitation = {this.changePrecipitation}
              changeTemperature = {this.changeTemperature}
              changeLocation = {this.changeLocation} 
            > </Input>
          </div>
          <div className="City-Display-Container">
            <CityViewer ref={instance => {this.cityViewer = instance}}> </CityViewer>
            <StatsViewer ref={instance=>{this.statsViewer = instance}}> </StatsViewer> 
            <LocationMap ref={instance=>{this.locationMap = instance}}></LocationMap>          
          </div>
          
        </div>
      </div>
    );
  }
  
  changeImage = (text) =>
  {
    this.cityViewer.changeImage(text);
  }
  
  changePrecipitation = (value)=>
  {
    console.log(value);
    this.statsViewer.changePrecipitation(value);
  }
  changeTemperature = (value)=>
  {
    this.statsViewer.changeTemperature(value);
  }

  changeLocation = (value)=>
  {
    this.locationMap.changeLocation(value);
  }
}
