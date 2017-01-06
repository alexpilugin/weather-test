import React from 'react';
import './App.css';
import Record from './Record';
var request = window.superagent;

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      data: {},
    }

  }
  componentWillMount() {
        this.loadData();
  }
  loadData() {
        const myID='34b0fde02d01135dbf28d67d41e2f45a';
        const url='http://api.openweathermap.org/data/2.5/forecast?q=London,uk&appid=' + myID;
        request.get(url)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ data: response.body});
            } else {
                console.log('There was an error fetching from openWeatherMap.org', error);
            }
        });
  }

  render() {
        console.log(this.state.data.list);
        if(this.state.data.list){
            var counter = 0;
            const list = this.state.data.list.map((item) => {
                const txt_date=item.dt_txt;
                const weather=item.weather;
                const main=item.main;
                counter++;
                console.log(weather[0].main + " " + weather[0].description);
                return (
                    <Record 
                      key={item.dt}
                      counter={counter}
                      date={txt_date}
                      temparature={main.temp}
                      temp_min={main.temp_min}
                      temp_max={main.temp_max}
                      pressure={main.pressure}
                      humidity={main.pressure}
                      weather_main={weather[0].main}
                      weather_description={weather[0].description}
                    />
                )    
            }); 
            return  (
                <div className="App">
                    {list}
                </div>
            )  
        } else {
            return (
                <div className="App">
                NO DATA
                </div>
            )
        }

    }

}

export default App;
