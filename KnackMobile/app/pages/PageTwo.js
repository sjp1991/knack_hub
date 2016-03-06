import React, {
	Component,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'

// export default allows class to be referenced using import <className> from '<path>'
export default class PageTwo extends Component {
	constructor(props) {
		super(props)
		this.state = {
      connected: false,
      posts: {},
      users: {},
      userId: undefined,
    }
		this.props.ddpClient.connect((err, wasReconnect) => {
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
		_this = this
		this.props.ddpClient.call("login", [
		  { user : { email }, password }
		], (err, result)=> {
			if(err) {
				console.log(err)
			} else {
				console.log(result)
				_this.setState({user: this.props.ddpClient.collections.users[result.id]})
				// _this.setState({userId: result.id})
			}
		});
	}
	_register(email, password) {
    this.props.ddpClient.call('register', [email, password]);
	}
	_handleIncrement() {
    this.props.ddpClient.call('addPost');
    console.log(this.state.user)
    // console.log(this.state.users[this.state.userId].emails[0].address)
  }
	makeSubscription() {
    this.props.ddpClient.subscribe("posts", [], () => {
      this.setState({posts: this.props.ddpClient.collections.posts});
    });
  }
  observePosts() {
    let observer = this.props.ddpClient.observe("posts");
    observer.added = (id) => {
      this.setState({posts: this.props.ddpClient.collections.posts})
    }
    observer.changed = (id, oldFields, clearedFields, newFields) => {
      this.setState({posts: this.props.ddpClient.collections.posts})
    }
    observer.removed = (id, oldValue) => {
      this.setState({posts: this.props.ddpClient.collections.posts})
    }
  }
	render() {
		return(
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey',}}>
				<Text>
					{this.state.user ? 
						this.state.user.emails[0].address
						:
						null
					}
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
