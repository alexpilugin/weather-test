import React from 'react';

class Record extends React.Component {
  render() {
      return (
        <div className="forecast">
            <p>{this.props.counter} : {this.props.date}</p>
            <p>Temparature: {this.props.temparature} 
                (min: {this.props.temp_min}, 
                max: {this.props.temp_max}), 
                pressure: {this.props.pressure}, 
                humidity: {this.props.humidity}%</p>
            <p>{this.props.weather_main} : {this.props.weather_description}</p>
        </div>
      )
  }
}

export default Record;
