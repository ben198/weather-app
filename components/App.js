import React from 'react';
import Weather from './Weather/Weather';

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Weather/>
            </div>
        );
    }
}