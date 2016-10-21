import React, { Component } from 'react';
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import { apiKey, lat, lon } from '../../config';
import Skycons from 'react-skycons';

function fahrenheitToCensius(temp) {
    return (temp - 32) * 5 / 9;
}

function transformIconText(text) {
    return text.split('').map((char) => {
        if (char === '-') {
            return '_';
        } else {
            return char.toUpperCase();
        }
    }).join('');
}

export default class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forecast: {
                currently: {
                    temperature: null,
                    summary: null,
                    icon: 'PARTLY_CLOUDY_DAY'
                }
            }
        }
    }

    componentDidMount() {
        superagent
            .get(`https://api.darksky.net/forecast/${apiKey}/${lat},${lon}`)
            .use(jsonp)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    this.setState({forecast: res.body}, () => {
                        console.log(this.state.forecast);
                    });
                }
            })
    }

    render() {
        let tempInFahrenheit = this.state.forecast.currently.temperature;
        let tempInCelsius = fahrenheitToCensius(tempInFahrenheit);
        let iconText = transformIconText(this.state.forecast.currently.icon);
        return (
            <div>
                <h2>Weather at Nuffield Industrial Estate</h2>
                <div className="container-skycons">
                    <Skycons
                        color="black"
                        icon={iconText}
                        autoplay={true}/>
                </div>
                <h4>{this.state.forecast.currently.summary}</h4>
                <p>{Math.round(tempInCelsius)}&deg;C</p>
            </div>
        );
    }

} 