import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native'

export default class ClassDetail extends Component {
	constructor(props) {
		super(props)
		
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={{fontSize: 30, alignSelf: 'center'}}>Class Title</Text>
				<Text style={styles.h3}>Badges to be granted upon completion</Text>
				<Text style={styles.h3}>Class Details</Text>
				<Text style={styles.h3}>Location</Text>
				<Text style={styles.h3}>When</Text>
				<TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Enroll Class</Text></TouchableOpacity>
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

module.exports = ClassDetail 