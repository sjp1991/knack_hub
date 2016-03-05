import React, {
	Component,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'

// export default allows class to be referenced using import <className> from '<path>'
export default class PageFour extends Component {
	constructor(props) {
		super(props)
	}
	_popPage(){
		this.props.navigator.pop()
	}
	render() {
		return(
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink',}}>
				<Text>
					PageFour
				</Text>
				<TouchableOpacity onPress={this._popPage.bind(this)}><Text>PopPage</Text></TouchableOpacity>
			</View>
		)
	}
}

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = PageFour 
