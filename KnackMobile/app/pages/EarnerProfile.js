import React, {
	Component,
	View,
	Text,
	Dimensions,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native'

var earner = {
	id: "abcd",
	firstName: "Jason",
	lastName: "Park",
	email: "jasonpark@example.com",
	pic: "",
	description: "I am noob",
	phone: "604-555-555",
	earnedBadges: [{
		badgeId: "badge1",
	},
	{
		badgeId: "badge2",
	}],
	appliedTasks: [{
		taskId: "task1",
		appliedDate: "Jan. 1st 2016",
		status: "completed",
	}],
	appliedClasses: [{
		classId: "class1",
		appliedDate: "Jan. 1st 2016",
		status: "not completed",
	}]
}

// export default allows class to be referenced using import <className> from '<path>'
export default class EarnerProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
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
				<Text style={styles.name}>
					{this.state.earner.firstName} {this.state.earner.lastName}
				</Text>
				<Image
        			style={styles.logo}
        			source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
        		/>
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

	        	<TouchableOpacity>
	        	 	<Text style={styles.attr}>
	        			<Text style={styles.heading}>
	        				Jobs Applied
	        			</Text>
	        		</Text>
	        	</TouchableOpacity>

	        	<TouchableOpacity>
	        	 	<Text style={styles.attr}>
	        			<Text style={styles.heading}>
	        				Course Registered
	        			</Text>
	        		</Text>
	        	</TouchableOpacity>
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
  	paddingBottom: 20,
  },

  heading: {
  	fontSize: 20,
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
});

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = EarnerProfile 
