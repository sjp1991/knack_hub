import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native'

export default class TaskDetail extends Component {
	constructor(props) {
		super(props)
		
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={{fontSize: 30, alignSelf: 'center'}}>Task Title</Text>
				<Text style={styles.h3}>Company: Knack</Text>
				<Text style={styles.h3}>Location: 5 E 8th Avenue</Text>
				<Text style={styles.h3}>Time: 2pm-8pm</Text>
				<Text style={styles.h3}>Rate: $15/hour</Text>
				<Text style={styles.h3}>Required Badges: B1, B2, B3</Text>
				<Text style={styles.h3}>Description: Make burgers and tacos</Text>
				<TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Apply</Text></TouchableOpacity>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 60,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 30,
	},
	separator: {
		height: 2,
		backgroundColor: 'black'
	},
	h3: {
		fontSize: 20,
	},
	button: {
		backgroundColor: 'teal',
		width: 150,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
	}
})

module.exports = TaskDetail