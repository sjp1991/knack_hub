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
	description: "I make everyone amateurs. So pro, Very skills, Much wow",
	phone: "604-555-555",
	earnedBadges: [{
		badgeId: "badge1",
	},
	{
		badgeId: "badge2",
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
	render() {
		return(
			<View style={styles.container}>
				<View style={styles.piccontainer}>
					<Image
	        			style={styles.logo}
	        			source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
	        		/>
	        		<View style={styles.rightcontainer}>
						<Text style={styles.name}>
							{this.state.earner.firstName} {this.state.earner.lastName}
						</Text>
					</View>
				</View>
        		<View style={styles.attr}>
	        		<Text style={styles.heading}>
	        			Description
	        		</Text>
	        		<View style={styles.descriptioncontainer}>
		        		<Text style={styles.description}>
		        			{this.state.earner.description}
		        		</Text>
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
		        		<Text style = {styles.lengthContainer}>
		        			({earner.appliedTasks.length})
		        		</Text>
		        	</View>
	        	</View>
	        	
				{
					this.state.showTasks ?
					<View style={{height:100}}>
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
		        		<Text style = {styles.lengthContainer}>
		        			({earner.appliedClasses.length})
		        		</Text>
		        	</View>
	        	</View>

	        	{
					this.state.showClasses ?
					<View style={{height:100}}>
					<ScrollView style={styles.scrollcontainer}>
						<ListView 
							dataSource={this.state.appliedClasses}
							renderRow={this.renderClasses}
							style={styles.listview} />
					</ScrollView>
					</View>
					:
					null
				}
			</View>
		)
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
	    	<View style={styles.row}>
	    		<Text>{task.taskName}</Text>
	    	</View>
		);
	}

	renderClasses(cl) {
	    return (
	    	<View style={styles.row}>
	    		<Text>{cl.className}</Text>
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
    backgroundColor: 'gray',
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

  scrollcontainer: {
  	height: 100,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },

  name: {
  	fontSize: 30,
  	paddingBottom: 20,
  },

  logo: {
    height: 100,
    borderRadius: 50,
    width: 100
  },

  attr: {
  	borderTopWidth: 1,
  	marginTop: 10,
  },

  heading: {
  	fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  	fontWeight: 'bold',
  },

  descriptioncontainer: {
  	backgroundColor: 'white',
  },

  description: {
  	fontSize: 16,
  	padding: 1,
  	marginLeft: 4,
  	width: width * 0.8,
  },

  buttonContainer: {
  	flexDirection:'row',
  	alignItems: 'center',
  	justifyContent: 'space-between',
  	width: width * 0.8,
  },

  lengthContainer: {
  	marginLeft: 5,
  	fontSize: 18,
  	fontWeight: 'bold',
  	textAlign: 'center',
  }
});

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = EarnerProfile 
