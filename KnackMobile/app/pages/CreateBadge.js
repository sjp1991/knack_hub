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
} from 'react-native'

// export default allows class to be referenced using import <className> from '<path>'
export default class CreateBadge extends Component {
	constructor(props) {
		super(props)
		this.state={title: 'Computer Literacy', description: 'Learn how to use Office', category:'Hard Skill', pic:'http://s17.postimg.org/p6kqnxvpb/computer_literacy.png'}
	}

	_create() {
		this.props.ddpClient.call('createBadge', [{title:this.state.title, pic:this.state.pic,
		description:this.state.description, category:this.state.category}])
	}

	render() {
		return(
			<View style={styles.container}>

			<Image style={{width: 200, height: 200}} source={{uri: 'https://lh3.googleusercontent.com/TJXbuHM8KFn6JuG43LOc38gU0oJdlRoO1I64ncbUPj-y987ebZG89uFhB5Jf8R_tAbcp=w300'}} />
			<TextInput style={styles.badgeinput} 
				placeholder= "Add pic url"
				placeholderTextColor="gray"
				onChangeText={(pic) => this.setState({pic})}
    		value={this.state.pic}>
			</TextInput>
				<TextInput style={styles.badgeinput} 
					ref= "title"
					placeholder="Enter Badge Title"
  					placeholderTextColor="gray"
					onChangeText={(title) => this.setState({title})}
    				value={this.state.title}/>

				<TextInput style={styles.badgeinput} 
					ref= "description"
					placeholder="Enter Badge Description"
  					placeholderTextColor="gray"
					onChangeText={(description) => this.setState({description})}
    				value={this.state.description}/>

				<TextInput style={styles.badgeinput} 
					ref= "category"
					placeholder="Enter category"
  					placeholderTextColor="gray"
					onChangeText={(category) => this.setState({category})}
    				value={this.state.category}/>   		
					
					<TouchableOpacity onPress={this._create.bind(this)}>
						<Text>Create Badge</Text>
					</TouchableOpacity>
				</View>
		)
	}
}

var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  badgeinput: {
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