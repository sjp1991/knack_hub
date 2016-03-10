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

import Meteor, {connectMeteor} from 'react-native-meteor'

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

@connectMeteor
export default class TaskList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tasks: ds.cloneWithRows([]),
		}
	}
	startMeteorSubscriptions(){
		Meteor.subscribe('tasks')
	}
	getMeteorData(){
		return {
			tasksDataSource: ds.cloneWithRows(Meteor.collection('tasks').find()),
		}
	}
	componentWillMount(){
		this.props.setNavBarVisibility(true)
	}
	_onTaskRowPress(rowData, rowID) {
		this.props.navigator.push({className: 'TaskDetail', title: '', rowData})
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.filter}>
					<Text style={styles.filterText}>filter options</Text>
				</TouchableOpacity>
				<ListView style={{backgroundColor:'#41645c'}}
					dataSource={this.data.tasksDataSource}
					renderSeparator={(sectionID, rowID)=><View key={rowID} style={styles.separator}></View>}
					renderRow={(rowData, sectionID, rowID) =>
						<TouchableOpacity onPress={this._onTaskRowPress.bind(this, rowData)}>
							<Image style={styles.rowImage} source={require('./../img/class/class1.jpg')}>
								<View style={styles.rowView}>
									<Text style={[styles.renderText, {width: 90}]}>{rowData.title}</Text>
									<Text style={styles.renderText}>{rowData.location}</Text>
									<Text style={styles.renderText}>{(8 + (parseInt(rowID)*3)) + '00m'}</Text>
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
		backgroundColor: '#373535',
		marginTop: 56,
	},
	separator: {
		height: 0,
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
