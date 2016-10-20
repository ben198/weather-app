import React from 'react';
import { render } from 'react-dom';
import Weather from './components/Weather/Weather';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './components/styles.scss';

render(
    <Weather/>,
    document.getElementById('container')
);