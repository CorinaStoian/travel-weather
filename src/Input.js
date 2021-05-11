import React from 'react';
import './Input.css'
//import * as Seq from './server.js'


export default class Input extends React.Component
{ 
  state = {
    text : "",
    date : null
  };

  constructor(props)
  {
    super(props);
    
    this.UpdateText = this.UpdateText.bind(this);
    this.SubmitCity = this.SubmitCity.bind(this);
    this.UpdateDate = this.UpdateDate.bind(this);
  }

  UpdateText(evt)
  {
    this.setState({text : evt.target.value});
  }

  UpdateDate(evt)
  { 
    this.setState({date : evt.target.value});
  }

  SubmitCity(evt)
  {
    if (evt.key === 'Enter')
    {
      //console.log(this.state.text);
      //console.log(this.state.date);
      
      let q = "http://api.weatherstack.com/current?access_key=32284091643b74890e592e3df20f0a97&query=";
      q = q + this.state.text;
      fetch(q, null).then(data=>{return data.json()})
      .then(res=>{
        this.props.changeImage({'icon' : res.current.weather_icons[0], 'name' : res.location.region});
        this.props.changePrecipitation({'precip' : res.current.precip, 'cloud' : res.current.cloudcover});
        this.props.changeTemperature({'temperature' : res.current.temperature , 'feelslike' : res.current.feelslike});
        this.props.changeLocation({'lat' : res.location.lat , 'lon' : res.location.lon});
      })
      .catch(error=>{console.log(error)});
      
    }
  }

  render() {
    return(
      <div>
        <input type="text" placeholder="City Name" onChange={this.UpdateText} onKeyPress={this.SubmitCity} style={{textAlign : 'center', width : '250px'}}>
        </input>
        {/*<input type="date" onChange ={this.UpdateDate}>
        </input>*/}
      </div>
    );
  }
}