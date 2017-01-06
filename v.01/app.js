var request = window.superagent;
const App = React.createClass({

    myID: '34b0fde02d01135dbf28d67d41e2f45a',
    getInitialState: function () {
        return { data: {} };
    },
    componentWillMount() {
        this.loadData();
    },
    loadData() {
        const url = 'http://api.openweathermap.org/data/2.5/forecast?q=London,uk&appid=' + this.myID;
        request.get(url)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ data: response.body});
            } else {
                console.log('There was an error fetching from openWeatherMap.org', error);
            }
        });
    },

    render() {
        console.log(this.state.data.list);
        if(this.state.data.list){
            var counter = 0;
            const list = this.state.data.list.map((item) => {
                const txt_date = item.dt_txt;
                const weather = item.weather;
                const main = item.main;
                counter++;
                console.log(weather[0].main + " " + weather[0].description);
                return (
                    <div key= {item.dt} className="forecast">
                        <p>{counter} : {txt_date}</p>
                        <p>Temparature: {main.temp}, Min: {main.temp_min}, Max: {main.temp_max}, pressure: {main.pressure}, humidity: {main.pressure}%</p>
                        <p>{weather[0].main} | {weather[0].description}</p>
                    </div>
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
                </div>
            )
        }

    }
})


ReactDOM.render(
    <App />,
    document.getElementById('content')
);
