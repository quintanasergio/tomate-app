import React, { Component } from 'react';
import logo from './logo.png';

class CyclesContainer extends Component {

	cycles(){
		var retval = [];
		var num = this.props.cycles;

		for (var i = 1; i <= num; i++) {
			if (this.props.currentCycle<i) {
				retval.push(<img className="not-done" src={logo} style={{width:25, height:25}} alt="tomate" key={"cycle"+i} />);
			} else if (this.props.currentCycle>i) {
				retval.push(<img src={logo} style={{width:25, height:25}} alt="tomate" key={"cycle"+i} />);				
			} else {
				retval.push(<img className="current" src={logo} style={{width:25, height:25}} alt="tomate" key={"cycle"+i} />);
			}
		}
		return retval;
	}

	render(){
		return(
			<div>
				{this.cycles()}
			</div>
		);
	}
}


export default CyclesContainer;