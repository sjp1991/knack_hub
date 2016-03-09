import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Dimensions,
	Image,
	Animated,
} from 'react-native'

let {height, width} = Dimensions.get('window')
import Meteor, {connectMeteor, } from 'react-native-meteor'

@connectMeteor
export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: 'eric@example.com',
			password: '123',
			dashboardY: new Animated.Value(-height / 2),
		}
	}
	_pushPage(className, title) {
		this.props.navigator.push({className, title})
	}
	_login() {
		const email = this.state.email
		const password = this.state.password
		Meteor.loginWithPassword(email, password, (err)=>{
			if(err) {
				alert(err)
			} else {
				this._openDashboard.bind(this)()
			}
		})
	}
	_openDashboard() {
		Animated.timing(  // Uses easing functions
			this.state.dashboardY,  // The value to drive
			{toValue: 0},  // Configuration
		).start()
	}
	render() {
		return(
			<Image source={require('./../img/login/login-bg.jpg')} style={styles.backgroundImg}>
				<View style={styles.logoContainer}>
					<Image source={require('./../img/login/knack-logo-new.png')} style={styles.logo} />
				</View>
				<View style={styles.loginContainer}>
					<View>
						<View style={styles.loginInputContainer}>
							<TextInput style={styles.loginInput}
								placeholder="Email"
		  					placeholderTextColor="white"
								onChangeText={(email) => this.setState({email})}
		    				value={this.state.email}/>
		    			</View>
	    			</View>

	    			<View style={styles.loginInputContainer}>
							<TextInput secureTextEntry={true}
								placeholder="Password"
		  					placeholderTextColor="white"
								style={styles.loginInput}
								onChangeText={(password)=>this.setState({password})}
								value={this.state.password}/>
						</View>
						<TouchableOpacity style={[styles.loginInputContainer, {backgroundColor: '#41645c'}]}
							onPress={this._login.bind(this)}>
							<View style={styles.loginButtonInnerView}>
								<Text style={styles.loginButtonText}>LogIn</Text>
							</View>
						</TouchableOpacity>
				</View>
				<View style={{width: width, height: 40, alignSelf: 'flex-end',}}>
					<View style={styles.bottomButtonsRowContainer}>
						<TouchableOpacity
							onPress={this._pushPage.bind(this, 'Register', 'Register')}>
							<Text style={styles.bottomText}>Register an account</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={styles.bottomText}>Forgot password?</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Animated.View style={{position: 'absolute', bottom: this.state.dashboardY, width, height: height / 2, backgroundColor: '#373536', borderTopWidth: 16, borderColor: '#41645c', justifyContent: 'center', alignItems: 'center'}}>
					<TouchableOpacity style={[styles.loginInputContainer, {backgroundColor: '#41645c'}]}
						onPress={()=>this.props.navigator.push({className: 'EarnerProfile', title: 'Profile'})}>
						<View style={styles.loginButtonInnerView}>
							<Text style={styles.loginButtonText}>Profile</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.loginInputContainer, {backgroundColor: '#41645c'}]}
						onPress={()=>this.props.navigator.push({className: 'TaskList', title: 'Task Board'})}>
						<View style={styles.loginButtonInnerView}>
							<Text style={styles.loginButtonText}>Task Board</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.loginInputContainer, {backgroundColor: '#41645c'}]}
						onPress={()=>this.props.navigator.push({className: 'CreateTask', title: 'Find Classes'})}>
						<View style={styles.loginButtonInnerView}>
							<Text style={styles.loginButtonText}>Find Classes</Text>
						</View>
					</TouchableOpacity>
				</Animated.View>
			</Image>
		)
	}
}

var styles = StyleSheet.create({
	backgroundImg: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  logoContainer: {
  	flex: 1,
  	justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 36,
    // backgroundColor: 'red',
  },
	logo: {
		height: 130,
		width: 130,
		resizeMode: 'cover',
		// backgroundColor: 'red',
	},
	loginInputContainer: {
		backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    width: width * 0.8,
	},
  loginInput: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    // backgroundColor: 'red',
    color: 'white',
    margin: 10,

    height: 50,
  },
  loginButtonInnerView: {

  	height: 50,
  	justifyContent: 'center',
  },
  loginButtonText: {
  	fontSize: 20,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.8)',
  },
  buttonContainer: {
  	flexDirection:'row'
  },
  bottomText: {
  	color: 'rgba(255,255,255,0.8)',
  	alignSelf: 'center',
  	fontSize: 14,
  	marginLeft: 12,
  	marginRight: 12,
  },
  bottomButtonsRowContainer: {
  	flex: 1,
  	justifyContent: 'space-between',
  	flexDirection: 'row',
  	alignItems: 'center',
  },
});

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = Login
