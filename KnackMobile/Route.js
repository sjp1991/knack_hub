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
  DrawerLayoutAndroid,
  InteractionManager,
} from 'react-native'

import DDPClient from 'ddp-client';

import Login from './app/pages/Login'
import PageTwo from './app/pages/PageTwo'
import PageThree from './app/pages/PageThree'
import PageFour from './app/pages/PageFour'
import AddEarnerProfile from './app/pages/AddEarnerProfile'
import Register from './app/pages/Register'
import Dashboard from './app/pages/Dashboard'
import ClassList from './app/pages/ClassList'
import ClassDetail from './app/pages/ClassDetail'
import TaskList from './app/pages/TaskList'
import TaskDetail from './app/pages/TaskDetail'
import EarnMoreBadge from './app/pages/EarnMoreBadge'
import CreateBadge from './app/pages/CreateBadge'
import CreateClass from './app/pages/CreateClass'
const Page = {Login, PageTwo, PageThree, PageFour, AddEarnerProfile, Register, Dashboard, ClassList, ClassDetail, TaskList, TaskDetail, EarnMoreBadge, CreateBadge, CreateClass}

const Drawer = require('react-native-drawer') // Third party drawer layout that works in iOS, very funky so use with care

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
			isDrawerOpen: false,
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
	_openDrawer() {
		if(Platform.OS === 'ios') {
			this.refs.drawer.open()
		} else {
			this.refs.drawer.openDrawer()
		}
	}
	_closeDrawer() {
		if(Platform.OS === 'ios') {
			this.refs.drawer.close()
		} else {
			this.refs.drawer.closeDrawer()
		}
	}
	toggleDrawerLayout(){
		if(this.state.isDrawerOpen) {
			this._closeDrawer.bind(this)()
		} else {
			this._openDrawer.bind(this)()
		}
	}
	// This gets called when you add new page into navigator stack (ie. navigator.push or navigator.replace)
	renderPage(route, navigator) {
		if(route.className) {
			return React.createElement(Page[route.className], {route, navigator, ddpClient, setNavBarVisibility: this._setNavBarVisibility.bind(this)})
		} else {
			route.title = 'Class List'
			return React.createElement(Page['ClassList'], {route, navigator, ddpClient, setNavBarVisibility: this._setNavBarVisibility.bind(this)})
		}
	}
	_setNavBarVisibility(visible) {
		InteractionManager.runAfterInteractions(()=> {
			this.setState({hideNavBar: !visible})
		})
	}
	drawerMenuItemPressed(alertPopupMessage) {
		this._closeDrawer()
		alert(alertPopupMessage)
		this.ddpClient.call('addPost')
	}
	renderMenuItems() {
		return (
			<View style={styles.drawerLayoutView}>
				<TouchableOpacity onPress={()=>alert('Do Something!')}>
					<View style={styles.drawerMenuItemView}>
						<Image style={styles.drawerMenuItemImage} source={require('./app/img/navigation/nav_icon_menu.png')} />
						<Text style={styles.drawerMenuItemText}>Do Something!</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.drawerMenuItemSeparator}/>
				<TouchableOpacity onPress={this.drawerMenuItemPressed.bind(this, 'Do Something2!')}>
					<View style={styles.drawerMenuItemView}>
						<Image style={styles.drawerMenuItemImage} source={require('./app/img/navigation/nav_icon_menu.png')} />
						<Text style={styles.drawerMenuItemText}>Do Something2!</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.drawerMenuItemSeparator}/>
				<TouchableOpacity onPress={()=>alert('Do Something3!')}>
					<View style={styles.drawerMenuItemView}>
						<Image style={styles.drawerMenuItemImage} source={require('./app/img/navigation/nav_icon_menu.png')} />
						<Text style={styles.drawerMenuItemText}>Do Something3!</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.drawerMenuItemSeparator}/>
				<TouchableOpacity onPress={()=>this.refs.navigator.push({className: 'AddEarnerProfile', title: 'AddEarnerProfile'})}>
					<View style={styles.drawerMenuItemView}>
						<Image style={styles.drawerMenuItemImage} source={require('./app/img/navigation/nav_icon_menu.png')} />
						<Text style={styles.drawerMenuItemText}>Add Earner Page</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.drawerMenuItemSeparator}/>
			</View>
		)
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
	_renderNavigationView() {
		let _this = this // We need to hold onto reference to 'this' as "this" gets overwritten inside the method
		const NavigationBarRouteMapper = {
			LeftButton(route, navigator, index, navState) {
        // if(Platform.OS === 'ios' &&  index > 0) {
        //   return (
        //     <View style={{flexDirection:"row"}}>
        //       <View style={styles.navLeftIconView}>
        //         <TouchableOpacity onPress={navigator.pop} style={styles.navButton}>
        //           <Image style={styles.navLeftIcon} source={require('./app/img/navigation/back_bar_icon.png')} />
        //         </TouchableOpacity>
        //       </View>
    				// 	<View style={styles.navLeftIconView}>
    				// 		<TouchableOpacity onPress={_this.toggleDrawerLayout.bind(_this)} style={styles.navButton}>
    				// 			<Image style={styles.navLeftIcon} source={require('./app/img/navigation/nav_icon_menu.png')} />
    				// 		</TouchableOpacity>
    				// 	</View>
        //     </View>
        //   )
        // }
				return (
					<View style={styles.navLeftIconView}>
						<TouchableOpacity onPress={_this.toggleDrawerLayout.bind(_this)} style={styles.navButton}>
							<Image style={styles.navLeftIcon} source={require('./app/img/navigation/home_icon.png')} />
						</TouchableOpacity>
          </View>
				)
			},
			RightButton(route, navigator, index, navState) {
				// Button on the right side of navigationView
				return (
					<View style={styles.navRightIconView}>
						<TouchableOpacity onPress={_this.toggleDrawerLayout.bind(_this)} style={styles.navButton}>
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
	drawerLayoutView: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: Platform.OS === 'ios' ? 26 : 16,
		backgroundColor: '#2D3E50',
	},
	drawerMenuItemView: {
		flexDirection: 'row',
		height: 48,
		alignItems: 'center',
	},
	drawerMenuItemSeparator: {
		height: 2 / PixelRatio.get(),
		borderColor: '#899BA5',
		borderBottomWidth: 1 / PixelRatio.get(),
	},
	drawerMenuItemImage: {
		marginLeft: 10,
		marginRight: 8,
		tintColor: '#E7F8FA',
		resizeMode: 'contain',
		height: 24,
		width: 22,
	},
	drawerMenuItemText: {
		color: '#E7F8FA',
	},
})

module.exports = Route
