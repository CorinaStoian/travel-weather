import React, { Component } from 'react';
import './StatsViewer.css'

export default class StatsViewer extends React.PureComponent
{
  state ={
    precip : "",
    cloud : "",
    temperature : "",
    feelslike : ""
  };
  
  render()
  {
    return(
      <div className = "Stats-Viewer">
        <div className="Temperature-Viewer">
          <img id="img1" src="https://png.pngtree.com/svg/20161123/humidity_886294.png" />
          <textarea className = "InfoText" readOnly value = {"Precip : " + this.state.precip} />
          <textarea className = "InfoText" readOnly value = {"Cloud : " + this.state.cloud} />
        </div>
        <div className="Precipitation-Viewer">
          <img id="img2" src={"https://img.icons8.com/metro/1600/temperature.png"} />
          <textarea className = "InfoText"  readOnly value= {"Temp : " + this.state.temperature + " degrees"}/>
          <textarea className = "InfoText"  readOnly value= {"Feels like : " + this.state.feelslike + " degrees"}/>
        </div>
      </div>
    );
  }
  
  changeTemperature = (val) => 
  {
    this.setState({'temperature' : val.temperature});
    this.setState({'feelslike' :val.feelslike});
  }
  
  changePrecipitation = (val) =>
  {
    this.setState({'precip' : val.precip});
    this.setState({'cloud' : val.cloud});
  }
}