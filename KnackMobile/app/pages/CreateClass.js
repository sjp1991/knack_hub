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
	ScrollView
} from 'react-native'

// export default allows class to be referenced using import <className> from '<path>'
export default class CreateBadge extends Component {
	constructor(props) {
		super(props)
		this.state={name: '', description: '', location:'', size:'', signedUpNum:'0', badgeId:[], when:''}
	}

	_create() {
		this.props.ddpClient.call('createClass', [{name:this.state.name, description:this.state.description, location:this.state.location,
			size:this.state.size, signedUpNum:this.state.signedUpNum, badgeId:this.state.badgeId, when:this.state.when}])
	}

	render() {
		return(
			<View style={styles.container}>

				<TextInput style={styles.classinput} 
					ref= "title"
					placeholder="Enter Class Title"
  					placeholderTextColor="gray"
					onChangeText={(name) => this.setState({name})}
    				value={this.state.title}/>

				<TextInput style={styles.classinput} 
					ref= "description"
					placeholder="Enter Class Description"
  					placeholderTextColor="gray"
					onChangeText={(description) => this.setState({description})}
    				value={this.state.description}/>

				<Image style={{width: 200, height: 100, resizeMode: 'contain'}} source={{uri: 'https://lh3.googleusercontent.com/TJXbuHM8KFn6JuG43LOc38gU0oJdlRoO1I64ncbUPj-y987ebZG89uFhB5Jf8R_tAbcp=w300'}} />
				
				<TextInput style={styles.classinput} 
					ref= "when"
					placeholder="when"
  					placeholderTextColor="gray"
					onChangeText={(when) => this.setState({when})}
    				value={this.state.when}/> 

				<TextInput style={styles.classinput} 
					ref= "location"
					placeholder="Enter location"
  					placeholderTextColor="gray"
					onChangeText={(location) => this.setState({location})}
    				value={this.state.location}/>  

				<TextInput style={styles.classinput} 
					ref= "size"
					placeholder="Enter size"
  					placeholderTextColor="gray"
					onChangeText={(size) => this.setState({size})}
    				value={this.state.size}/>  

				<View style={styles.buttonContainer}>
					<TouchableOpacity style = {styles.button}>
						<Text>Cancel</Text>
					</TouchableOpacity>
					
					<TouchableOpacity onPress={this._create.bind(this)}>
						<Text>Create Class</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
  },
  classinput: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'white',
    margin: 10,
    width: width * 0.8,
    height: 40
  },

  buttonContainer: {
  	flexDirection: 'row'
  },

  button: {
  	paddingRight: 40
  }
});

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = CreateBadge