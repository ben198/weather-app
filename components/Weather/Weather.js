import React, { Component } from 'react';
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import { apiKey, lat, lon } from '../../config';

function fahrenheitToCensius(temp) {
    return (temp - 32) * 5 / 9;
}

export default class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forecast: {
                currently: {
                    temperature: null,
                    summary: null
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
        return (
            <div>
                <h2>Weather at Nuffield Industrial Estate</h2>
                <h4>{this.state.forecast.currently.summary}</h4>
                <p>{Math.round(tempInCelsius)}&deg;C</p>
            </div>
        );
    }

} 