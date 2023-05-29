import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import './index.css';
import App from './App';

// ReactDOM.render() method to render the App component to the root element in the HTML file
ReactDOM.render(
  // Provider component is used to provide the store object to the application, which is used to manage the application state
  // The Provider component is a higher-order component that wraps around the entire application, providing access to the store object to all the components in the application.
  //  This enables the components to read and update the state in the store object.
  <Provider store={store}>  
    {/* The App component is wrapped inside the Provider component, so that it has access to the state in the store object. */}
    <App />
  </Provider>,
  document.getElementById('root')
);
