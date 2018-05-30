import React, { Component } from 'react';

class ToggleButton extends Component {

	handleStopClick = () => {
		this.props.stopTimer();
	}

	handleStartClick = () => {
		this.props.startTimer();
	}

	render() {
		if(this.props.running){
			return (
				<button className = "stop-button" onClick={()=>this.handleStopClick()}> Stop </button>
			);
		} else {
			return (
				<button className = "start-button" onClick={()=>this.handleStartClick()}> Start </button>

			);			
		}

	}

}

export default ToggleButton;