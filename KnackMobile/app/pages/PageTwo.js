import React, {
	Component,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'

import DDPClient from 'ddp-client';
let ddpClient = new DDPClient({
  host: '172.18.147.31',
  // host: '192.168.1.3', // If using android use your device IP address
  port: '3000',
  // url: <your websocket url>
});

// export default allows class to be referenced using import <className> from '<path>'
export default class PageTwo extends Component {
	constructor(props) {
		super(props)
		this.state = {
      connected: false,
      posts: {}
    }
		ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) {
      	console.log(err)
        connected = false
      } else {
        this.makeSubscription();
        this.observePosts();
        // this._observeU`ser()
      }
      this.setState({ connected: connected });
    });
	}
	_popPage(){
		this.props.navigator.pop()
	}
	_pushPage(className, title) {
		this.props.navigator.push({className, title})
	}
	_login(email, password) {
		ddpClient.call("login", [
		  { user : { email }, password }
		], function (err, result) {
			console.log(err)
			console.log(result)
		});
	}
	_register(email, password) {
    ddpClient.call('register', [email, password]);
	}
	_handleIncrement() {
    ddpClient.call('addPost');
  }
	makeSubscription() {
    ddpClient.subscribe("posts", [], () => {
      this.setState({posts: ddpClient.collections.posts});
    });
  }
  observePosts() {
    let observer = ddpClient.observe("posts");
    observer.added = (id) => {
      this.setState({posts: ddpClient.collections.posts})
    }
    observer.changed = (id, oldFields, clearedFields, newFields) => {
      this.setState({posts: ddpClient.collections.posts})
    }
    observer.removed = (id, oldValue) => {
      this.setState({posts: ddpClient.collections.posts})
    }
  }
  // _observeUser() {
  // 	let observer = 
  // }
	render() {
		return(
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey',}}>
				<Text>
					PageTwo
				</Text>
				<TouchableOpacity onPress={this._handleIncrement.bind(this)}><Text>Increment Posts</Text></TouchableOpacity>

				<TouchableOpacity onPress={this._register.bind(this, 'eric@example.com', '123')}><Text>Register</Text></TouchableOpacity>
				<TouchableOpacity onPress={this._login.bind(this, 'eric@example.com', '123')}><Text>Login</Text></TouchableOpacity>
				<TouchableOpacity onPress={this._popPage.bind(this)}><Text>PopPage</Text></TouchableOpacity>
				<TouchableOpacity onPress={this._pushPage.bind(this, 'PageThree', 'PageThree Title')}><Text>NextPage</Text></TouchableOpacity>
			</View>
		)
	}
}

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = PageTwo 
