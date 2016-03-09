import React, {
  AppRegistry,
  Component
} from 'react-native';
import Route from './Route'

class KnackMobile extends Component {
  render() {
    return <Route />
  }
}
AppRegistry.registerComponent('KnackMobile', () => KnackMobile)
