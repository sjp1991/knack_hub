import React, {
  AppRegistry,
  Component
} from 'react-native';

import App from './app';

class KnackMobile extends Component {
  render() {
    return <App />;
  }
}
AppRegistry.registerComponent('KnackMobile', () => KnackMobile);
