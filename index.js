/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import './gesture-handler';

if (__DEV__) {
    require("./ReactotronConfig");
  }

AppRegistry.registerComponent(appName, () => App);
