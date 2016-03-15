import React, {
	Component,
	View,
	Text,
	Dimensions,
	StyleSheet,
	Image,
	ListView,
	ScrollView,
	TouchableOpacity,
} from 'react-native'
const {width, height} = Dimensions.get('window')
import Meteor, {connectMeteor, } from 'react-native-meteor'

const earner = {
	id: "abcd",
	firstName: "Jason",
	lastName: "Park",
	email: "jasonpark@example.com",
	pic: "",
	description: "I have an iOS app I am making with react-native. The Game class contains a ListView component. I set the state in the constructor and include a dataSource. I have a hardcoded array of data for right now that I store in a different state property (this.state.ds). Then in the componentDidMount I use the cloneWithRows method to clone my this.state.ds as my dataSource for the view. That is pretty standard as far as ListViews go and is working well.",
	phone: "604-555-5555",
	earnedBadges: [{
		badgeId: "badge1",
		badgeName: "Basic Food Service",
		badgeCompany: "Potluck Cafe",
	},
	{
		badgeId: "badge2",
		badgeName: "Cooking Methods",
		badgeCompany: "Potluck Cafe",
	}],
	appliedTasks: [{
		taskId: "task1",
		taskName: "Catering at Foodbank",
		appliedDate: "Jan. 1st 2016",
		status: "completed",
	},
	{
		taskId: "task2",
		taskName: "Serving at Restaurant",
		appliedDate: "Mar. 1st 2016",
		status: "Applied",
	},
	{
		taskId: "task3",
		taskName: "Cashier at SaveOnFood",
		appliedDate: "Feb. 1st 2016",
		status: "Applied",
	}],
	appliedClasses: [{
		classId: "class1",
		className: "Serving 101",
		appliedDate: "Jan. 1st 2016",
		status: "not completed",
	},
	{
		classId: "class2",
		className: "Leadership 110",
		appliedDate: "Feb. 1st 2016",
		status: "Enrolled",
	}]
}

let ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 != r2
})

@connectMeteor
export default class EarnerProfile extends Component {
	constructor(props) {
		super(props)
		var appliedTasks = new ListView.DataSource({
    		rowHasChanged: (r1, r2) => r1 != r2
  	})
		var appliedClasses = new ListView.DataSource({
    		rowHasChanged: (r1, r2) => r1 != r2
  	})
		this.state = {
			appliedTasks: appliedTasks.cloneWithRows(earner.appliedTasks),
			appliedClasses: appliedClasses.cloneWithRows(earner.appliedClasses),
			showTasks: false,
			showClasses: false,
			userId: undefined,
			earner: earner,
			badges: [],
			users: undefined,
			tasks: undefined,
		}
	}
	startMeteorSubscriptions(){
		Meteor.subscribe('earners')
		Meteor.subscribe('badges')
		Meteor.subscribe('tasks')
		Meteor.subscribe('classes')
		Meteor.subscribe('users')
	}
	getMeteorData() {
		let data = {
			earners: Meteor.collection('earners').find(),
			earner: Meteor.collection('earners').findOne(),
			badges: Meteor.collection('badges').find(),
			tasks: Meteor.collection('tasks').find(),
			classes: Meteor.collection('classes').find(),
			users: Meteor.collection('users').find(),
		}
		if(data.earner) {
			data.appliedTasks = ds.cloneWithRows(data.earner.appliedTasks)
			data.appliedClasses = ds.cloneWithRows(data.earner.appliedClasses)
		}
		return data
	}
	componentWillMount() {
    this.props.setNavBarVisibility(true)
	}
	_onPressAddNewBadge() {
		this.props.navigator.push({className: 'EarnMoreBadge', 'title': 'Earn a Badge'})
	}
	render() {
		return(
			<ScrollView>
				<View style={styles.container}>
					<Image source={require('./../img/badges/earner_background.png')} style={styles.backgroundImg}>
						<View style={{height: 50, backgroundColor: 'transparent'}}></View>
						<View style={styles.piccontainer}>
							<Image style={styles.logo} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
	        		<View style={styles.rightcontainer}>
	        			<Image style={{width: 25, height: 25, marginLeft: 180}} source={require('./../img/navigation/edit.png')}/>
								<Text style={styles.name}>
									{this.data.earners && this.data.earners.length > 0 ? this.data.earners[0].firstName : null} {this.data.earners && this.data.earners.length > 0 ? this.data.earners[0].lastName : null}
								</Text>
								<View style={styles.levelcontainer}>
									<Text style={styles.level}> Lv 7 </Text>
									<Image style={{width: 160, height: 20,}} source={require('./../img/badges/experience_bar.png')}/>
								</View>
							</View>
						</View>
						<View>
							<View style={styles.contactcontainer}>
								<Text style={styles.contact}> {this.data.earners && this.data.earners.lenght > 0 ? this.data.earners[0].phone : null} </Text>
								<Text style={styles.contact}> 1234 56th St. Van </Text>
							</View>
							<View style={styles.contactcontainer}>
								<Text style={styles.contact}> {this.data.users ? this.data.users[0].emails[0].address : null} </Text>
							</View>
						</View>
					</Image>
					<View>
						<View style={{height: 20, backgroundColor: 'transparent'}}>
						</View>
						<View style={styles.badgecontainer2}>
							{this.renderBadge()}
							<TouchableOpacity onPress={this._onPressAddNewBadge.bind(this)}>
								<Image style={{width: 100, height: 120, resizeMode: 'cover', margin: 5,}} source={require('./../img/badges/add_new_badge.png')}/>
							</TouchableOpacity>
						</View>
			    </View>
	    		<View style={styles.attr}>
	    			<View style={styles.descriptionslot}>
	        		<View style={styles.descriptioncontainer}>
		        		<Text style={styles.description}>
		        			{this.data.earners && this.data.earners.length > 0 ? this.data.earners[0].desc : null}
		        		</Text>
	        		</View>
	      		</View>
	      	</View>
	      	<View style={styles.attr}>
	        	<View style={styles.buttonContainer}>
		        	<TouchableOpacity onPress={this.showTasks.bind(this)}>
	    	    		<Text style={styles.heading}>
	        				Tasks Applied
	        			</Text>
	        		</TouchableOpacity>
	        		<View style={styles.lengthcontainer}>
		        		<Text style = {styles.length}>
		        			{this.data.earners && this.data.earners.length > 0 ? this.data.earners[0].appliedTasks.length : 0}
		        		</Text>
	        		</View>
	        	</View>
	      	</View>
					{
						this.state.showTasks ?
							<ScrollView style={styles.scrollcontainer}>
								<ListView
									dataSource={this.data.appliedTasks}
									renderRow={this.renderTasks.bind(this)}
									style={styles.listview} />
							</ScrollView>
						:
						null
					}
					<View style={styles.attr}>
						<View style={styles.buttonContainer}>
							<TouchableOpacity onPress={this.showClasses.bind(this)}>
								<Text style={styles.heading}>
									Classes Registered
								</Text>
							</TouchableOpacity>
							<View style={styles.lengthcontainer}>
								<Text style = {styles.length}>
									{this.data.earners && this.data.earners.length > 0 ? this.data.earners[0].appliedClasses.length : 0}
								</Text>
							</View>
						</View>
					</View>
	      	{
						this.state.showClasses ?
							<ScrollView style={styles.scrollcontainer}>
								<ListView
									dataSource={this.data.appliedClasses}
									renderRow={this.renderClasses.bind(this)}
									style={styles.listview} />
							</ScrollView>
						:
						null
					}
				</View>
			</ScrollView>
		)
	}
	renderBadge() {
		if(this.data.badges) {
			return this.data.badges.map((badge)=>{
				return (
					<Image key={badge._id} style={{width: 90, height: 120, resizeMode: 'cover', margin: 5,}} source={{uri: badge.pic}}/>
				)
			})
		}
	}
	showTasks() {
		this.setState({
			showTasks: !this.state.showTasks
		})
	}
	showClasses() {
		this.setState({
			showClasses: !this.state.showClasses
		})
	}
	renderTasks(taskId) {
    return (
    	<View style={styles.popUpAttr}>
	    	<View style={styles.row}>
	    		<View style={styles.rowEntry}>
	    			<Text style={styles.popUpContainers}>
							{this.data.tasks? this.data.tasks.find((task)=>task._id === taskId).title : null }
	    			</Text>
	    		</View>
	    	</View>
    	</View>
		)
	}
	renderClasses(classId) {
    return (
    	<View style={styles.popUpAttr}>
	    	<View style={styles.row}>
	    		<View style={styles.rowEntry}>
	    			<Text style={styles.popUpContainers}>
							{this.data.classes? this.data.classes.find((cl)=>cl._id === classId).name : null }
    				</Text>
    			</View>
    		</View>
    	</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#373536',
    marginTop: 56,
  },
  backgroundImg: {
    width: width,
    height: null,
  },
  piccontainer: {
  	marginLeft: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightcontainer: {
  	flex: 1,
  	backgroundColor: 'transparent',
  	justifyContent: 'center',
  },
  level: {
  	fontSize: 16,
  	color: 'white',
  	marginRight: 10,
  },
  levelcontainer: {
  	flexDirection: 'row',
  	justifyContent: 'space-around',
  	marginRight: 30,
  },
  contactcontainer: {
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	marginLeft: 30,
  	marginRight: 30,
  },
  badgecontainer1: {
  	height: 170,
  	flexDirection: 'row',
  	alignItems: 'flex-end',
  	borderColor: '#6b6e6d',
  	borderTopWidth: 2,
  	width: width * 0.9
  },
  badgecontainer2: {
  	borderColor: '#6b6e6d',
  	borderTopWidth: 2,
  	flexDirection: 'row',
    flexWrap: 'wrap',
  	alignItems: 'flex-start',
  	width: width * 0.9,
  	marginBottom: 16,
  	paddingTop: 16,
  },
  badgeinfo: {
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  badgename: {
  	fontSize: 16,
  	color: 'white',
  	fontWeight: 'bold',
  	justifyContent: 'flex-start',
  },
  badgecompany: {
  	fontSize: 14,
  	color: 'white',
  },
  scrollcontainer: {
  	// height: 100,
  },
  separator: {
  	justifyContent: 'center',
  	height: 2,
  	backgroundColor: 'white',
  	width: width * 0.8,
  },
  row: {
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#668f7f',
    width: width,
  },
  rowEntry: {
  	flexDirection: 'row',
  	justifyContent: 'center',
  },
  name: {
  	marginLeft: 35,
  	fontSize: 26,
  	paddingBottom: 10,
  	color: 'white',
  },
  contact: {
  	fontSize: 16,
  	color: 'white',
  },
  logo: {
    height: 120,
    borderRadius: 100,
    width: 120,
    borderWidth: 5,
    borderColor: '#373536',
  },
  moreBadge: {
    height: 20,
    borderRadius: 40,
    width: 20,
    borderWidth: 40,
    borderColor: '#668f7f',
  },
  attr: {
  	borderTopWidth: 2,
  	borderColor: '#6b6e6d',
  	width: width * 0.9,
  },
  heading: {
  	fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  	fontWeight: 'bold',
  	color: 'white',
  },
  descriptioncontainer: {
  	backgroundColor: '#373536',
  },
  descriptionslot: {
  	justifyContent: 'center',
  	marginTop: 24,
  	marginBottom: 24,
  },
  description: {
  	fontSize: 14,
  	lineHeight:20,
  	padding: 1,
  	marginLeft: 4,
  	width: width * 0.8,
  	color: 'white',
  },
  buttonContainer: {
  	flexDirection:'row',
  	alignItems: 'center',
  	justifyContent: 'space-between',
  	width: width * 0.8,
  	height: 60,
  },
  length: {
  	fontSize: 18,
  	fontWeight: 'bold',
  	textAlign: 'center',
  	color: 'white',
  	marginTop: 3,
  },
  lengthcontainer: {
  	backgroundColor: '#668f7f',
  	borderRadius: 50,
  	height: 30,
  	width: 30,
  	alignItems: 'center',
  },
  popUpContainers: {
  	fontSize: 20,
  	fontWeight: 'bold',
  	color: 'white',
  }
})

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = EarnerProfile
