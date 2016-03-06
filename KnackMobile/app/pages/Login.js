import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TextInput,
	JSONObject,
	TouchableOpacity,
	Dimensions,
} from 'react-native'

// export default allows class to be referenced using import <className> from '<path>'
export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			password: "abcd",
		}
	}
	_popPage(){
		this.props.navigator.pop()
	}
	_pushPage(className, title) {
		this.props.navigator.push({className, title})
	}
	render() {
		return(
			<View style={styles.container}>
				<View>
					<TextInput style={styles.logininput} 
						ref= "email"
						placeholder="Enter email"
	  					placeholderTextColor="gray"
						onChangeText={(email) => this.setState({email})}
	    				value={this.state.email}/>
    			</View>

    			<View>
					<TextInput secureTextEntry={true}
						ref= "password"
						placeholder="Enter password"
	  					placeholderTextColor="gray"
						style={styles.logininput}
						onChangeText={(password)=>this.setState({password})}
						value={this.state.password}/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button}
						onPress={this._pushPage.bind(this, 'Register', 'Register Title')}>
						<Text>Register</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						onPress={this._pushPage.bind(this, 'PageFour', 'PageFour Title')}>
						<Text>Log In</Text>
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

  logininput: {
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'white',
    margin: 10,
    width: width * 0.8,
    height: 40
  },

  buttonContainer: {
  	flexDirection:'row'
  },
  
  button: {
  	paddingRight: 40
  }
});

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = Login 
