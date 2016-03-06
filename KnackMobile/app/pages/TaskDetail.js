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
		this.state = {
			isApplied: false
		}
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

					<ScrollView contentContainerStyle={{height: height-170, backgroundColor: 'black', alignItems: 'center'}}>
						<View style={{width: width * 0.9, }}>
							<Text style={styles.h1}>Part-time waiter</Text>
						</View>
						<View style={styles.separator} />
						<View style={{marginTop:12, marginBottom: 12, width: width * 0.85, flexDirection: 'row', height: 130, justifyContent:'space-around', alignItems: 'center',}}>
							<Image style={{width: 100, height: 120, resizeMode: 'cover',}} source={require('./../img/badges/badic_food_service.png')}/>
							<Text style={{width: 140, color: 'white', fontSize: 15}}>Required badges to apply to this task</Text>
						</View>
						<View style={styles.separator} />
						<Text style={{ marginTop: 24, width: width * 0.75, color: 'white', fontSize: 12, lineHeight: 20}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</Text>
						<View style={{marginTop: 8, flexDirection: 'row', width: width * 0.75,}}><Text style={{color: 'white', fontSize: 12, width: 55, textAlign: 'right'}}>Rate: </Text><Text style={{color: 'white', fontSize: 12}}>$ 12 / h</Text></View>
						<View style={{marginTop: 8, flexDirection: 'row', width: width * 0.75,}}><Text style={{color: 'white', fontSize: 12, width: 55, textAlign: 'right'}}>Location: </Text><Text style={{color: 'white', fontSize: 12}}>1234 East Hasting. Vancouver</Text></View>
						<View style={{marginTop: 8, flexDirection: 'row', width: width * 0.75,}}><Text style={{color: 'white', fontSize: 12, width: 55, textAlign: 'right'}}>Time: </Text><Text style={{color: 'white', fontSize: 12}}>6:00 p.m. - 9:00 p.m. Wednesdays</Text></View>
						<View style={{marginTop: 8, flexDirection: 'row', width: width * 0.75,}}><Text style={{color: 'white', fontSize: 12, width: 55}}></Text><Text style={{color: 'white', fontSize: 12}}>2016/2/4 - 2016/3/5</Text></View>
					</ScrollView>

				<TouchableOpacity onPress={()=>this.setState({isApplied: true})}
					style={{height: 60, backgroundColor: '#41645c', justifyContent: 'center', alignItems: 'center',}}>
					<Text style={{fontSize: 26, color: 'white', textAlign: 'center'}}>{this.state.isApplied ? 'Applied!' : 'Apply Task'}</Text>
				</TouchableOpacity>
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#41645c',
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