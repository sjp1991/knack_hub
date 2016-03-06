import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
	PickerIOS,
	Image,
	ScrollView,
} from 'react-native'
let {height, width} = Dimensions.get('window')

// export default allows class to be referenced using import <className> from '<path>'
export default class CreateTask extends Component {
	constructor(props) {
		super(props)
		this.state={title:'IT Support', wage: '$10.25/hour', description: 'Answer calls and assist customers with internet connectivity issues', location:'HubHub Community Centre', requiredBadgeId:''}
	}

	_create() {
		this.props.ddpClient.call('createTask', [{title:this.state.title, wage:this.state.name, description:this.state.description, location:this.state.location,
			requiredBadgeId: this.state.requiredBadgeId, distance:''}])
	}
	componentDidMount() {
		this.props.setNavBarVisibility(true)
	}

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Text style={styles.uploadText}>Tap to upload</Text>
					<Text style={styles.uploadText}>Class title image</Text>
				</View>
				<ScrollView style={styles.scroll}>
					<View>
						<View style={{height:64, width:width*.7, borderWidth:2, borderColor:'gray', marginTop:30, alignSelf:'center'}}>
							<Text style={{color:'gray', marginTop:-8, width:100, alignSelf:'center', textAlign:'center'}}>Title</Text>
							<TextInput style={styles.classinput}
								onChangeText={(title) => this.setState({title})}
		    				value={this.state.title}>
							</TextInput>
						</View>
						<View style={{height:64, width:width*.7, borderWidth:2, borderColor:'gray', marginTop:30, alignSelf:'center'}}>
							<Text style={{color:'gray', marginTop:-8, width:100, alignSelf:'center', textAlign:'center'}}>Wage</Text>
							<TextInput style={styles.classinput}
								onChangeText={(wage) => this.setState({wage})}
		    				value={this.state.wage}>
							</TextInput>
						</View>
						<View style={{height:140, width:width*.7, borderWidth:2, borderColor:'gray', marginTop:30, alignSelf:'center'}}>
							<Text style={{color:'gray', marginTop:-8, width:130, alignSelf:'center', textAlign:'center'}}>Class Description</Text>
							<TextInput style={[styles.classinput, {height: 125}]}
								onChangeText={(description) => this.setState({description})}
								multiline={true}
		    				value={this.state.description}>
							</TextInput>
						</View>
						<View style={{height:64, width:width*.7, borderWidth:2, borderColor:'gray', marginTop:30,alignSelf:'center'}}>
							<Text style={{color:'gray', marginTop:-8, width:100, alignSelf:'center', textAlign:'center'}}>Location</Text>
							<TextInput style={styles.classinput}
								onChangeText={(location) => this.setState({location})}
		    				value={this.state.location}>
							</TextInput>
						</View>
						<View style={{height:64, width:width*.7, borderWidth:2, borderColor:'gray', marginTop:30, alignSelf:'center'}}>
							<Text style={{color:'gray', marginTop:-8, width:70, alignSelf:'center', textAlign:'center'}}>Required BadgeId</Text>
							<TextInput style={styles.classinput}
								onChangeText={(requiredBadgeId) => this.setState({requiredBadgeId})}
		    				value={this.state.requiredBadgeId}>
							</TextInput>
						</View>
					</View>
				</ScrollView>
				<View style={{marginTop:30, justifyContent:'center', alignItems:'center', backgroundColor:'#41645c', height:50}}>
					<TouchableOpacity onPress={this._create.bind(this)}>
						<Text style={{color:'white', fontSize: 25}}>Create Task</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
    backgroundColor: '#373536'
  },
  classinput: {
    fontSize: 20,
    textAlign: 'center',
    width: width * 0.7,
    height: 50,
    color:'white'
  },

  buttonContainer: {
  	flexDirection: 'row'
  },

  button: {
  	paddingRight: 40
  },

  uploadText:{
  	fontSize:16,
  	textAlign:'center',
  	color: '#333'
  },

  imageContainer:{
  	height:150,
  	backgroundColor:'white',
  	justifyContent:'center',
  	borderBottomWidth: 24,
  	borderColor:'#41645c'
  },

  scroll:{
  	height:height-225,
  },

  name:{
  	color:'gray',
  	fontSize:20,
  }
});

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = CreateTask