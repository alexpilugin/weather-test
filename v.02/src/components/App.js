import React from 'react';
import './App.css';
import Record from './Record';
var request = window.superagent;
var google = window.google;

class App extends React.Component {
  
  constructor() {
    super();
    //instead of getInitialState()
    this.state = {
      data: {},
      position: {
        lat: 51.5287718,
        lng: -0.2416819,
      }
    }
    this.initGoogleMap = this.initGoogleMap.bind(this);
  }
  componentWillMount() {
    this.loadData();
  }
  componentDidMount() {
    this.initGoogleMap();    
  }
  loadData = () => {
        const userID='34b0fde02d01135dbf28d67d41e2f45a';
        //const url='http://api.openweathermap.org/data/2.5/forecast?q=London,uk&appid=' + userID;
        const url='http://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.position.lat+'&lon='+this.state.position.lng +'&units=metric&appid=' + userID;
        request.get(url)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ data: response.body});
            } else {
                console.log('There was an error fetching from openWeatherMap.org', error);
            }
        });
  }
 initGoogleMap = () => {
    var latlng = new google.maps.LatLng(this.state.position.lat, this.state.position.lng);  
    var myOptions = {
      zoom: 6,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }; 
    var map = new google.maps.Map(document.getElementById("map"), myOptions); 

    var marker;

    function placeMarker(location) {
        if ( marker ) {
            marker.setPosition(location);
        } else {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
        }
    }

    google.maps.event.addListener(map, 'click', (event) => {
        var myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
        //map.setCenter(new google.maps.LatLng( lat, lng ) );

        placeMarker(event.latLng);
        map.panTo(myLatLng);

        this.setState({
            position: {
                lat: lat,
                lng: lng,
            }      
        })
        console.log(this.state.position);
        this.loadData()
    })

 } 

  render() {
        //console.log(this.state.data.list);
        if(this.state.data.list){
            var counter = 0;
            const list = this.state.data.list.map((item) => {
                const txt_date=item.dt_txt;
                const weather=item.weather;
                const main=item.main;
                counter++;
                //console.log(weather[0].main + " " + weather[0].description);
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
