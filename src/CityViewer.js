import React, { Component } from 'react';
import './CityViewer.css'

export default class CityViewer extends React.PureComponent {    
  state = {
    src : "",
    name : ""
  };
    
    render() {
        return (
            <div className="City-Viewer">
                <img src={this.state.src} />;
                <textarea value={this.state.name} readOnly={true} />
            </div>
        );
    }
    
    changeImage = (src) =>
    {
      console.log("Changed weather picture to " + src.name);
      this.setState({'src' : src.icon});
      this.setState({'name' : src.name});
    }
}
