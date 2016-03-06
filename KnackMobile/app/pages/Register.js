import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
	PickerIOS
} from 'react-native'

// export default allows class to be referenced using import <className> from '<path>'
export default class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "eric@example.com",
			password: "123",
			passwordConfirm: "123",
		}
	}

	_popPage(){
		this.props.navigator.pop()
	}
	_pushPage(className, title) {
		this.props.navigator.push({className, title})
	}

	_register() {
		const email = this.state.email
		const password = this.state.password
    this.props.ddpClient.call('register', [email, password]);
    this._popPage()
	}

	render() {
		return(
			<View style={styles.container}>
				

				<TextInput style={styles.registerinput} 
					ref= "email"
					placeholder="Enter email"
  					placeholderTextColor="gray"
					onChangeText={(email) => this.setState({email})}
    				value={this.state.email}/>

				<TextInput secureTextEntry={true}
					ref= "password"
					placeholder="Enter password"
  					placeholderTextColor="gray"
					style={styles.registerinput}
					onChangeText={(password)=>this.setState({password})}
					value={this.state.password}/>

				<TextInput secureTextEntry={true}
					ref= "passwordConfirm"
					placeholder="Confirm password"
  					placeholderTextColor="gray"
					style={styles.registerinput}
					onChangeText={(password)=>this.setState({password})}
					value={this.state.password}/>

				<View style={styles.buttonContainer}>
					<TouchableOpacity style = {styles.button}
						onPress={this._popPage.bind(this)}>
						<Text>Cancel</Text>
					</TouchableOpacity>
					
					<TouchableOpacity onPress={this._register.bind(this)}>
						<Text>Continue</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  registerinput: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'white',
    margin: 10,
    width: width * 0.8,
    height: 40
  },

  buttonContainer: {
  	flexDirection: 'row'
  },

  button: {
  	paddingRight: 40
  }
});

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = Register
