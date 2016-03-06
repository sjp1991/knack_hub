import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ListView,
} from 'react-native'

let tempData = [{text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}]
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class EarnMoreBadge extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedRowID: 1,
			dataSource: ds.cloneWithRows(tempData),
		}
	}
	_onRowPress(rowID) {
		let data = tempData
		// console.log(data)
		data[rowID].isSelected = !data[rowID].isSelected
		this.setState({dataSource: ds.cloneWithRows(data)})
	}
	_renderRow(rowData, sectionID, rowID) {
		const rowStyle = rowData.isSelected ? styles.selectedRow : styles.unselectedRow
		// console.log(this.state.selectedRowID)
		return (
			<TouchableOpacity onPress={this._onRowPress.bind(this, rowID)} style={rowStyle}>
				<Text style={styles.renderText}>{rowData.text + ' ' + rowID}</Text>
			</TouchableOpacity>
		)
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<ListView 
					dataSource={this.state.dataSource}
					renderSeparator={(sectionID, rowID)=><View key={rowID} style={styles.separator}></View>}
					renderRow={this._renderRow.bind(this)} />
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
	},
	unselectedRow: {
		// backgroundColor: 'grey',
	},
	selectedRow: {
		height: 100
	}
})

module.exports = EarnMoreBadge 