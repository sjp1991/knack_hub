import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ListView,
	Image,
	Dimensions,
} from 'react-native'

import Meteor, {connectMeteor, } from 'react-native-meteor'

let tempData = [{text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', isSelected: false}, {text: 'Lorem Ipsum is simply dummy text of the pri', isSelected: false}, {text: 'There are many variations of passages of Lorem Ipsum available,', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}, {text: 'Class', isSelected: false}]
let tempClassData = [{name: 'Class 1', description: 'Food Services class', location:'Shoppers'}, {name: 'Class 2', description: 'Food Services tutorial', location:'Health BC'}]
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
let {height, width} = Dimensions.get('window')

@connectMeteor
export default class EarnMoreBadge extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedRowID: 1,
			dataSource: ds.cloneWithRows(tempData),
			classDataSource: ds.cloneWithRows(tempClassData),
		}
	}
	startMeteorSubscriptions(){

	}
	getMeteorData(){

	}
	_onRowPress(rowID) {
		let data = tempData
		// console.log(data)
		data[rowID].isSelected = !data[rowID].isSelected
		this.setState({dataSource: ds.cloneWithRows(data)})
	}
	_onRowClassPress(rowID) {
		alert(rowID)
	}
	_renderClassRow(rowData, sectionID, rowID) {
		return (
			<TouchableOpacity onPress={this._onRowClassPress.bind(this, rowID)} style={styles.classRowView}>
				<Text style={styles.renderClassText}>{rowData.name}</Text>
				<Text style={styles.renderClassText}>{rowData.description}</Text>
				<Text style={styles.renderClassText}>{rowData.location}</Text>
			</TouchableOpacity>
		)
	}
	_renderRow(rowData, sectionID, rowID) {
		if(!rowData.isSelected) {
			return (
				<TouchableOpacity onPress={this._onRowPress.bind(this, rowID)} style={styles.rowView}>
					<Image style={{width: 60, height: 80, resizeMode: 'contain'}} source={require('./../img/badges/DMO.png')}/>
					<Text style={styles.renderText}>{rowData.text + ' ' + rowID}</Text>
				</TouchableOpacity>
			)
		} else {
			return(
				<View>
					<TouchableOpacity onPress={this._onRowPress.bind(this, rowID)} style={styles.rowView}>
						<Image style={{width: 60, height: 80, resizeMode: 'contain'}} source={require('./../img/badges/DMO.png')}/>
						<Text style={styles.renderText}>{rowData.text + ' ' + rowID}</Text>
					</TouchableOpacity>
					<ListView
						dataSource={this.state.classDataSource}
						renderRow={this._renderClassRow.bind(this)}
					/>
				</View>
			)
		}
	}
	componentDidMount(){
		this.props.setNavBarVisibility(true)
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.filter}>
					<Text style={styles.filterText}>Search:  __________________________</Text>
				</TouchableOpacity>
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
		backgroundColor:'#41645c',
		marginTop: 56,
	},
	renderText: {
		fontSize: 16,
		marginLeft: 25,
		color: 'white',
		width: 240
	},
	renderClassText: {
		fontSize: 16,
		marginLeft: 25,
		color: 'white',
	},
	classRowView: {
		height:55,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center',
		paddingRight:10,
		backgroundColor: 'teal',
	},
	rowView:{
		height:85,
		flexDirection: 'row',
		alignItems:'center',
		paddingLeft:10,
		paddingRight:10,
		backgroundColor: 'rgba(0,0,0,0.7)',
	},
	badgeStyle:{
		width:75,
		height:75,
		resizeMode: 'contain',
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
	},
})

module.exports = EarnMoreBadge
