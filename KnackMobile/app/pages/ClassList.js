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

export default class ClassList extends Component {
	constructor(props) {
		super(props)
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			dataSource: ds.cloneWithRows(['Basic food service', 'Cooking Method', 'Dish-machine Operation', 'Knife skills', 'Personal Finance', 'Teamwork']),
		}
		this.props.setNavBarVisibility(true)
	}
	_renderRow(rowData, sectionID, rowID) {
		return (
			<TouchableOpacity>
				<Image style={styles.rowImage} source={require('./../img/class/class1.jpg')}>
					<View style={styles.rowView}>
						<Text style={styles.renderText}>{rowData}</Text>
						<Image style={styles.badgeStyle} source={require('./../img/badges/knife_skills.png')} />
					</View>
				</Image>
			</TouchableOpacity>
		)
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
					renderRow={this._renderRow.bind(this)} />
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor:'#41645c',
		flex: 1,
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