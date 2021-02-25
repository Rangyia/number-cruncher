// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

// redux store
import reducer from './store/reducers/auth';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// App
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";

// CSS
import "./index.css";
import "semantic-ui-css/semantic.min.css";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhances(applyMiddleware(thunk)));

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <ScrollToTop />
            <App />
        </Provider>
    </Router>,
    document.getElementById("root")
);
