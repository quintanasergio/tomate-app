import React, { Component } from 'react';

class ShowActiveMode extends Component {
	render(){

		if (this.props.shortBreak || this.props.longBreak ) {
			return(<h1>REST!</h1>);
		} else {
			return(<h1>WORK!</h1>)
		}
	}
}

export default ShowActiveMode;