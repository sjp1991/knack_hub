import React, {
	Component,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'

// export default allows class to be referenced using import <className> from '<path>'
export default class PageThree extends Component {
	constructor(props) {
		super(props)
	}
	_popPage(){
		this.props.navigator.pop()
	}
	_pushPage(className, title) {
		this.props.navigator.push({className, title})
	}
	render() {
		return(
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green',}}>
				<Text>
					PageThree
				</Text>
				<TouchableOpacity onPress={this._popPage.bind(this)}><Text>PopPage</Text></TouchableOpacity>
				<TouchableOpacity onPress={this._pushPage.bind(this, 'PageFour', 'PageFour Title')}><Text>NextPage</Text></TouchableOpacity>
			</View>
		)
	}
}

// This line allows class to be referenced using const <className> = require('<path>')
module.exports = PageThree
