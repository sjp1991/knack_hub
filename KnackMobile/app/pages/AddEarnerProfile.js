import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
} from 'react-native'

import DDPClient from 'ddp-client';
let ddpClient = new DDPClient({
  host: '172.18.147.31',
  // host: '192.168.1.3', // If using android use your device IP address
  port: '3000',
  // url: <your websocket url>
});

// export default allows class to be referenced using import <className> from '<path>'
export default class AddEarnerProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: undefined,
			lastName: undefined,
			description: undefined,
			email: undefined,
			cell: undefined,
			address: undefined,
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
					ref= 'firstName'
					placeholder='First Name'
  				placeholderTextColor='gray'
					onChangeText={(firstName) => this.setState({firstName})}
  				value={this.state.firstName} />

				<TextInput style={styles.logininput} 
					ref= 'lastName'
					placeholder='Last Name'
  				placeholderTextColor='gray'
					onChangeText={(lastName) => this.setState({lastName})}
  				value={this.state.lastName} />

  			<TextInput style={styles.logininput} 
					ref= 'description'
					placeholder='Description'
  				placeholderTextColor='gray'
					onChangeText={(description) => this.setState({description})}
  				value={this.state.description} />

				<TextInput style={styles.logininput} 
					ref= 'email'
  				placeholderTextColor='gray'
  				editable={false}
  				value={this.state.email} />
				<TextInput style={styles.logininput} 
					ref= 'cell'
					placeholder='Cell #'
  				placeholderTextColor='gray'
					onChangeText={(cell) => this.setState({cell})}
  				value={this.state.cell} />

				<TextInput style={styles.logininput} 
					ref= 'address'
					placeholder='Home Address'
  				placeholderTextColor='gray'
					onChangeText={(address) => this.setState({address})}
  				value={this.state.address} />

  			<View style={{flex:1, flexDirection: 'row', 'justifyContent': 'space-between'}}>
	  			<TouchableOpacity style={{width: 80}}>
						<Text>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{width: 80, alignItems: 'flex-end'}}>
						<Text>Save</Text>
					</TouchableOpacity>
  			</View>
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
module.exports = AddEarnerProfile 
