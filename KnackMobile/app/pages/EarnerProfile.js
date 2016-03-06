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

var earner = {
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
		taskName: "Testing task 1",
		appliedDate: "Jan. 1st 2016",
		status: "completed",
	},
	{
		taskId: "task2",
		taskName: "Testing task 2",
		appliedDate: "Mar. 1st 2016",
		status: "Applied",
	},
	{
		taskId: "task3",
		taskName: "Testing task 3",
		appliedDate: "Feb. 1st 2016",
		status: "Applied",
	}],
	appliedClasses: [{
		classId: "class1",
		className: "Mock Class 1",
		appliedDate: "Jan. 1st 2016",
		status: "not completed",
	},
	{
		classId: "class2",
		className: "Mock Class 2",
		appliedDate: "Feb. 1st 2016",
		status: "Enrolled",
	}]
}

// export default allows class to be referenced using import <className> from '<path>'
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
		}
		this.props.ddpClient.connect((err, wasReconnect) => {
			let connected = true;
			if (err) {
				console.log(err)
				connected = false
			} else {
				//this.makeSubscription();
				//this.observePosts();
				this.state.earner = earner;
				console.log(this.state.earner);
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
	makeSubscription() {
		this.props.ddpClient.subscribe("earners", [], () => {
			this.setState({earner: this.props.ddpClient.collections.earners});
		});
	}
	observeEarner() {
		let observer = this.props.ddpClient.observe("earners");
		observer.added = (id) => {
			this.setState({earner: this.props.ddpClient.collections.earners})
		}
		observer.changed = (id, oldFields, clearedFields, newFields) => {
			this.setState({earner: this.props.ddpClient.collections.earners})
		}
		observer.removed = (id, oldValue) => {
			this.setState({earner: this.props.ddpClient.collections.earners})
		}
	}
	_renderSeparatorView(rowData, sectionid, rowId) {
		return (sectionId,rowId)=><View key={rowId} style={styles.separator}></View>
	}
	render() {
		return(
			<ScrollView>
			<View style={styles.container}>
				<View style={styles.piccontainer}>
					<Image
	        			style={styles.logo}
	        			source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
	        		<View style={styles.rightcontainer}>
						<Text style={styles.name}>
							{this.state.earner.firstName} {this.state.earner.lastName}
						</Text>
						<Text style={styles.contact}> {this.state.earner.phone} </Text>
						<Text style={styles.contact}> {this.state.earner.email} </Text>
					</View>
				</View>
				<View style={styles.badgecontainer}>
					{this.renderBadge(this.state.earner.earnedBadges)}
					<Image
	        			style={styles.moreBadge}
	        			source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
				</View>

        		<View style={styles.attr}>
        			<View style={styles.descriptionslot}>
		        		<View style={styles.descriptioncontainer}>
			        		<Text style={styles.description}>
			        			{this.state.earner.description}
			        		</Text>
		        		</View>
	        		</View>
	        	</View>

	        	<View style={styles.attr}>
		        	<View style={styles.buttonContainer}>
			        	<TouchableOpacity onPress={this.showTasks.bind(this)}>
			        	 	<Text style={styles.attr}>
		    	    			<Text style={styles.heading}>
		        					Jobs Applied
		        				</Text>
		        			</Text>
		        		</TouchableOpacity>
		        		<View style={styles.lengthcontainer}>
			        		<Text style = {styles.length}>
			        			{earner.appliedTasks.length}
			        		</Text>
		        		</View>
		        	</View>
	        	</View>
	        	
				{
					this.state.showTasks ?
					<View style={{height:250}}>
					<ScrollView style={styles.scrollcontainer}>
						<ListView 
							dataSource={this.state.appliedTasks}
							renderRow={this.renderTasks}
							style={styles.listview} />
					</ScrollView>
					</View>
					:
					null
				}

				<View style={styles.attr}>
					<View style={styles.buttonContainer}>
		        		<TouchableOpacity onPress={this.showClasses.bind(this)}>
		        			<Text style={styles.heading}>
		        					Course Registered
		        			</Text>
		        		</TouchableOpacity>
		        		<View style={styles.lengthcontainer}>
			        		<Text style = {styles.length}>
			        			{earner.appliedClasses.length}
			        		</Text>
		        		</View>
		        	</View>
	        	</View>

	        	{
					this.state.showClasses ?
					
					<View style={{height:250}}>
						<ScrollView style={styles.scrollcontainer}>
							<ListView 
								dataSource={this.state.appliedClasses}
								renderSeparator={
									(this.rowId < earner.appliedClasses.length - 1) ? 
										this._renderSeparatorView()
									:
									null
								}
								renderRow={this.renderClasses}
								style={styles.listview} />
					</ScrollView>
					</View>
					:
					null
				}
			</View>
			</ScrollView>
		)
	}

	renderBadge(badges) {
		if(!badges) {
			return
		}

		return badges.map((badge)=>{
			return (
				<Image style={{width: 100, height: 120, resizeMode: 'cover', margin: 5,}} source={require('./../img/badges/badic_food_service.png')}/>
				// <Image
	   //     			style={styles.logo}
	   //      		source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
	   //      	>
				// 	<View key={badge.badgeId} style={styles.badgeinfo}>
				// 		<Text style={styles.badgename}>{badge.badgeName}</Text>
				// 		<Text style={styles.badgecompany}>{badge.badgeCompany}</Text>
				// 	</View>
				
				// </Image>
			)
		})
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

	renderTasks(task) {
	    return (
	    	<View style={styles.popUpAttr}>
		    	<View style={styles.row}>
		    		<View style={styles.rowEntry}>
		    			<Text style={styles.popUpContainers}>
		    				{task.taskName}
		    			</Text>
		    		</View>
		    	</View>
	    	</View>
		);
	}

	renderClasses(cl) {
	    return (
	    	<View style={styles.popUpAttr}>
		    	<View style={styles.row}>
		    		<View style={styles.rowEntry}>
		    			<Text style={styles.popUpContainers}>
	    					{cl.className}
	    				</Text>
	    			</View>
	    		</View>
	    	</View>
		);
	}
}

var width = Dimensions.get('window').width; 

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#373536',
    paddingTop: 100,
  },

  piccontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightcontainer: {
  	flex: 1,
  	marginLeft: 20,
  },

  badgecontainer: {
  	height: 150,
  	flexDirection: 'row',
  	alignItems: 'center',
  	borderTopWidth: 2,
  	borderColor: 'gray',
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
  	height: 100,
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
  	fontSize: 30,
  	paddingBottom: 20,
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
  	borderColor: 'gray',
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
  	height: 300,
  	justifyContent: 'center',
  },

  description: {
  	fontSize: 16,
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
});

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = EarnerProfile 
