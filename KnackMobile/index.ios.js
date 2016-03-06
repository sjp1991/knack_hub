if (typeof process === 'undefined') process = {};
			process.nextTick = setImmediate;
			module.exports = process;

import React, {
  AppRegistry,
  Component
} from 'react-native';

import App from './app';
import Route from './Route'

class KnackMobile extends Component {
  render() {
    return <Route />;
  }
}
AppRegistry.registerComponent('KnackMobile', () => KnackMobile);
