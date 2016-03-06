import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TextInput,
	JSONObject,
	TouchableOpacity,
} from 'react-native'

// export default allows class to be referenced using import <className> from '<path>'
export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
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
				<TextInput style={styles.logininput} 
					ref= "username"
					placeholder="Enter email"
  					placeholderTextColor="gray"
					onChangeText={(username) => this.setState({username})}
    				value={this.state.username}/>

				<TextInput secureTextEntry={true}
					ref= "password"
					placeholder="Enter password"
  					placeholderTextColor="gray"
					style={styles.logininput}
					onChangeText={(password)=>this.setState({password})}
					value={this.state.password}/>

				<TouchableOpacity onPress={this._pushPage.bind(this, 'PageFour', 'PageFour Title')}><Text>Log In</Text></TouchableOpacity>
			</View>
		)
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  logininput: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'white',
    margin: 10,
    width: 150,
    height: 40
  },
});

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = Login 
