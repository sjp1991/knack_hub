import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ListView,
	Image
} from 'react-native'

export default class TaskList extends Component {
	constructor(props) {
		super(props)
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			dataSource: ds.cloneWithRows(['Waiter', 'Driver', 'Chef', 'Dog-walker', 'Cahsier', 'Make-up', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task']),
		}
	}
	componentDidMount(){
		this.props.setNavBarVisibility(true)
	}
	_onTaskRowPress(rowData, rowID) {
		this.props.navigator.push({className: 'TaskDetail', title: ''})
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.filter}>
					<Text style={styles.filterText}>filter options</Text>
				</TouchableOpacity>
				<ListView 
					dataSource={this.state.dataSource}
					renderSeparator={(sectionID, rowID)=><View key={rowID} style={styles.separator}></View>}
					renderRow={(rowData, sectionID, rowID) =>
						<TouchableOpacity onPress={this._onTaskRowPress.bind(this)}>
							<Image style={styles.rowImage} source={require('./../img/class/class1.jpg')}>
								<View style={styles.rowView}>
									<Text style={styles.renderText}>{rowData}</Text>
									<Text style={styles.renderText}>Noodle House</Text>
									<Text style={styles.renderText}>500m</Text>
								</View>
							</Image>
						</TouchableOpacity>
					} />
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#41645c',
		marginTop: 56,
	},
	separator: {
		height: 2,
		backgroundColor: 'black'
	},
	renderText: {
		fontSize: 20,
		marginLeft: 8,
		color:'white'
	},
	rowImage: {
		flex:1,
		width: null,
		height: null,
	},
	rowView:{
		height:85,
		flexDirection: 'row',
		justifyContent:'space-between',
		alignItems:'center',
		paddingLeft:10,
		paddingRight:10,
		backgroundColor: 'rgba(0,0,0,0.7)',
	},
	filter:{
		height:60,
		backgroundColor:'#41645c', 
		justifyContent:'center',
		paddingLeft:10
	},

	filterText:{
		fontSize: 20,
		marginLeft: 10,
		color:'white'
	}
})

module.exports = TaskList 