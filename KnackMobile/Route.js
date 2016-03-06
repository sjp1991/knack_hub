'use strict'

import React, {
  Component,
  StyleSheet,
  Navigator,
  Platform,
  View,
  Text,
  BackAndroid,
  TouchableOpacity,
  PixelRatio,
  Image,
  InteractionManager,
} from 'react-native'

import DDPClient from 'ddp-client';

import Login from './app/pages/Login'
import PageTwo from './app/pages/PageTwo'
import PageThree from './app/pages/PageThree'
import PageFour from './app/pages/PageFour'
import AddEarnerProfile from './app/pages/AddEarnerProfile'
import EarnerProfile from './app/pages/EarnerProfile'
import Register from './app/pages/Register'
import Dashboard from './app/pages/Dashboard'
import ClassList from './app/pages/ClassList'
import ClassDetail from './app/pages/ClassDetail'
import TaskList from './app/pages/TaskList'
import TaskDetail from './app/pages/TaskDetail'
import EarnMoreBadge from './app/pages/EarnMoreBadge'
import CreateBadge from './app/pages/CreateBadge'
import CreateClass from './app/pages/CreateClass'
const Page = {Login, PageTwo, PageThree, PageFour, AddEarnerProfile, EarnerProfile, Register, Dashboard, ClassList, ClassDetail, TaskList, TaskDetail, EarnMoreBadge, CreateBadge, CreateClass}

let ddpClient = new DDPClient({
  host: '172.18.146.36',
  // host: '192.168.1.3', // If using android use your device IP address
  port: '3000',
  // url: <your websocket url>
})

export default class Route extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hideNavBar: true,
		}
		ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) {
      	console.log(err)
        connected = false
      }
      this.setState({ connected: connected })
    })
	}
	// This gets called when you add new page into navigator stack (ie. navigator.push or navigator.replace)
	renderPage(route, navigator) {
		if(route.className) {
			return React.createElement(Page[route.className], {route, navigator, ddpClient, setNavBarVisibility: this._setNavBarVisibility.bind(this)})
		} else {
			route.title = ''
			return React.createElement(Page['Login'], {route, navigator, ddpClient, setNavBarVisibility: this._setNavBarVisibility.bind(this)})
		}
	}
	_setNavBarVisibility(visible) {
		this.setState({hideNavBar: !visible})
	}
	componentDidMount() {
		// Override Android back button. Return false if you want to default back to original behaviour, which usually exits the app.
		BackAndroid.addEventListener('hardwareBackPress', ()=>{
			if(this.refs.navigator) {
				if(this.refs.navigator.getCurrentRoutes().length > 1) {
					// Override Android back button to pop() only if you have more than 1 item in navigator stack
					this.refs.navigator.pop()
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		})
	}
	_popToTop() {
		this.setState({hideNavBar: true})
		this.refs.navigator.popToTop()
	}
	_pop() {
		if(this.refs.navigator.getCurrentRoutes().length === 2) {
			this.setState({hideNavBar: true})
		}
		this.refs.navigator.pop()
	}
	_renderNavigationView() {
		let _this = this // We need to hold onto reference to 'this' as "this" gets overwritten inside the method
		const NavigationBarRouteMapper = {
			LeftButton(route, navigator, index, navState) {
				return (
					<View style={styles.navLeftIconView}>
						<TouchableOpacity onPress={_this._popToTop.bind(_this)} style={styles.navButton}>
							<Image style={styles.navLeftIcon} source={require('./app/img/navigation/home_icon.png')} />
						</TouchableOpacity>
          </View>
				)
			},
			RightButton(route, navigator, index, navState) {
				// Button on the right side of navigationView
				return (
					<View style={styles.navRightIconView}>
						<TouchableOpacity 
							onPress={_this._pop.bind(_this)}
							style={styles.navButton}>
							<Image style={styles.navRightIcon} source={require('./app/img/navigation/close_white.png')} />
						</TouchableOpacity>
          </View>
				)
			},
			Title(route, navigator, index, navState) {
				return (
					<View style={styles.navigationTitleView}>
						<Text style={styles.navigationTitleText}>
							{route.title}
						</Text>
					</View>
				)
			},
		}
		return (
			<Navigator initialRoute={{name: 'Login Page', index: 0}}
				ref='navigator'
				renderScene={this.renderPage.bind(this)}
				navigationBar={
					<Navigator.NavigationBar
						style={this.state.hideNavBar ? {height: 0} : styles.navigationBar}
						routeMapper={NavigationBarRouteMapper} />
				}
			/>
		)
	}
	render() {
		return this._renderNavigationView()
	}
}

let styles = StyleSheet.create({
	navigationBar: {
		backgroundColor: '#373536',
	},
	navLeftIconView: {
		flex:1,
		justifyContent: 'center',
	},
	navRightIconView: {
		flex:1,
		justifyContent: 'center',
	},
	navButton: {
		height: 60,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	navLeftIcon: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
	navRightIcon: {
		width: 24,
		height: 24,
		marginTop: 4,
		resizeMode: 'contain',
	},
	navigationTitleView: {
		flex:1,
		justifyContent: 'center',
	},
	navigationTitleText: {
		color: 'white',
		fontSize: 18,
		fontWeight: '500',
		// fontStyle: 'italic',
		alignSelf: 'flex-end',
	},
})

module.exports = Route
