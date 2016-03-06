import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	Image,
} from 'react-native'
let {height, width} = Dimensions.get('window')

export default class TaskDetail extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount(){
		this.props.setNavBarVisibility(false)
	}
	_onPressClose(){
		this.props.setNavBarVisibility(true)
		this.props.navigator.pop()
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{height: 170, width: width, backgroundColor: '#41645c'}}>
					<Image style={{height: 160, width: width, resizeMode: 'cover'}} source={require('./../img/class/class1.jpg')} />
					<TouchableOpacity onPress={this._onPressClose.bind(this)} style={{position: 'absolute', top: 26, right: 20}}>
						<Image style={{width: 44, height: 44}} source={require('./../img/navigation/close_black.png')}/>
					</TouchableOpacity>
				</View>
				<ScrollView contentContainerStyle={{flex:1, backgroundColor: 'black', alignItems: 'center'}}>
					<View style={{width: width * 0.9, }}>
						<Text style={styles.h1}>Part-time waiter</Text>
					</View>
					<View style={styles.separator} />
					<View style={{marginTop:12, marginBottom: 12, width: width * 0.85, flexDirection: 'row', height: 130, justifyContent:'space-around', alignItems: 'center',}}>
						<Image style={{width: 100, height: 120, resizeMode: 'cover',}} source={require('./../img/badges/badic_food_service.png')}/>
						<Text style={{width: 140, color: 'white', fontSize: 15}}>Badge granted upon completion</Text>
					</View>
					<View style={styles.separator} />
					<Text style={{ marginTop: 16, width: width * 0.75, color: 'white', fontSize: 12, lineHeight: 12}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</Text>
					<Text style={{ marginTop: 4, width: width * 0.75, color: 'white', fontSize: 12}}>Rate: $ 12 / h</Text>
					<Text style={{ marginTop: 4, width: width * 0.75, color: 'white', fontSize: 12}}>Location: 1234 East Hasting. Vancouver</Text>
					<Text style={{ marginTop: 4, width: width * 0.75, color: 'white', fontSize: 12}}>Time: 6:00 p.m. - 9:00 p.m. Wednesdays</Text>
					<Text style={{ marginTop: 4, width: width * 0.75, color: 'white', fontSize: 12}}>2016/2/4 - 2016/3/5</Text>
				</ScrollView>
				<TouchableOpacity style={{height: 60, backgroundColor: '#41645c', justifyContent: 'center', alignItems: 'center',}}>
					<Text style={{fontSize: 26, color: 'white', textAlign: 'center'}}>Apply Task</Text>
				</TouchableOpacity>
				{/*<Text style={{fontSize: 30, alignSelf: 'center'}}>Class Title</Text>
								<Text style={styles.h3}>Badges to be granted upon completion</Text>
								<Text style={styles.h3}>Class Details</Text>
								<Text style={styles.h3}>Location</Text>
								<Text style={styles.h3}>When</Text>
								<TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Enroll Class</Text></TouchableOpacity>*/}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginBottom: 30,
		// flexDirection: 'column',
	},
	separator: {
		height: 2,
		backgroundColor: 'black'
	},
	h1: {
		fontSize: 26,
		color: 'white',
		textAlign: 'center',
		margin: 12,
	},
	separator: {
		height: 1,
		width: width * 0.9,
		backgroundColor: 'grey',
	},
	button: {
		backgroundColor: '#41645c',
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