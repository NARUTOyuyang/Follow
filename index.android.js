/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';

// import App from './AppOne'
import App from './src/App'
require('./global');

export default class MyBaby extends Component {
    render() {

        return(
            <App/>
        )
    }
}

AppRegistry.registerComponent('MyBaby', () => MyBaby);
