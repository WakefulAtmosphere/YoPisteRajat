import React from 'react';
import ReactDOM from 'react-dom';
import data1 from './data/data.json'
import App from './components/app.js'


let data = data1["data"]

ReactDOM.render(<App data={data}/>, document.getElementById('root'))