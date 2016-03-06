import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ListView,
} from 'react-native'

export default class TaskList extends Component {
	constructor(props) {
		super(props)
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			dataSource: ds.cloneWithRows(['Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task', 'Task']),
		}
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<ListView 
					dataSource={this.state.dataSource}
					renderSeparator={(sectionID, rowID)=><View key={rowID} style={styles.separator}></View>}
					renderRow={(rowData, sectionID, rowID) =>
						<TouchableOpacity>
							<Text style={styles.renderText}>{rowData + ' ' + rowID + ' - Company ' + rowID}</Text>
						</TouchableOpacity>
					} />
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 60,
	},
	separator: {
		height: 2,
		backgroundColor: 'black'
	},
	renderText: {
		fontSize: 30,
		marginLeft: 8,
	}
})

module.exports = TaskList 