import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
				<View style={{flexDirection: 'column', justifyContent: 'space-between', height: 200}}>
					<TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Profile</Text></TouchableOpacity>
					<TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Task board</Text></TouchableOpacity>
					<TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Class Register</Text></TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'teal',
		width: 150,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
	}
})

module.exports = Dashboard 