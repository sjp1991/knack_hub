import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ListView,
	Image,
} from 'react-native'

import Meteor, {connectMeteor} from 'react-native-meteor'
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

@connectMeteor
export default class ClassList extends Component {
	constructor(props) {
		super(props)
	}
	startMeteorSubscriptions(){
		Meteor.subscribe('classes')
	}
	getMeteorData(){
		return {
			classesDataSource: ds.cloneWithRows(Meteor.collection('classes').find())
		}
	}
	_onClassRowPress(rowData, rowID) {
		this.props.navigator.push({className: 'ClassDetail', title: '', rowData})
	}
	_renderRow(rowData, sectionID, rowID) {
		return (
			<TouchableOpacity onPress={this._onClassRowPress.bind(this, rowData, rowID)}>
				<Image style={styles.rowImage} source={require('./../img/class/class1.jpg')}>
					<View style={styles.rowView}>
						<Text style={styles.renderText}>{rowData.name}</Text>
						<Image style={styles.badgeStyle} source={require('./../img/badges/knife_skills.png')} />
					</View>
				</Image>
			</TouchableOpacity>
		)
	}
	componentDidMount() {
    this.props.setNavBarVisibility(true)
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.filter}>
					<Text style={styles.filterText}>filter options</Text>
				</TouchableOpacity>
				<ListView style={{backgroundColor: '#41645c'}}
					dataSource={this.data.classesDataSource}
					renderSeparator={(sectionID, rowID)=><View key={rowID} style={styles.separator}></View>}
					renderRow={this._renderRow.bind(this)} />
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor:'#373535',
		flex: 1,
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
	}
})

module.exports = ClassList
