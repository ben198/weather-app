import React, { Component } from 'react';
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import { apiKey, lat, lon } from '../../config';

export default class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forecast: {}
        }
    }

    getForecast() {
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
        return (
            <div>
                <h2>Title of component</h2>
                <p>Paragraph text</p>
                <button 
                    type="button" 
                    onClick={this.getForecast.bind(this)}>
                    Request
                </button>
            </div>
        );
    }

} 