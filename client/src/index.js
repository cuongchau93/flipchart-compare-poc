import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import ComparisonTable  from './components/ComparisonTable';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<ComparisonTable />, document.getElementById('container'));

registerServiceWorker();
