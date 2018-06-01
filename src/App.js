import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ToggleButton from './ToggleButton.js';
import CyclesContainer from './CyclesContainer.js';
import ShowActiveMode from './ShowActiveMode.js';
import logo from './logo.png';
import './App.css';

class App extends Component {

    constructor(props){
      super(props);
      this.url = "http://www.freesfx.co.uk/rx2/mp3s/5/16900_1461333025.mp3";
      this.audio = new Audio(this.url);
      this.startTimer=this.startTimer.bind(this);
      this.stopTimer=this.stopTimer.bind(this);
      this.resetTimer=this.resetTimer.bind(this);
      this.handleSettings=this.handleSettings.bind(this);
      this.state= {
        timerOn: false,
        timer: '32000',
        cycles: 4,
        currentCycle: 0,
        shortBreak: false,
        longBreak: false,
        pomodoroLength: '1500000',
        shortBreakLength: '1500000',
        longBreakLength: '1500000'
      }
    }

    formatTimer(t){
      let hours = ('0' + Math.floor(t/3600000)); 
      let minutes = ('0' + Math.floor(((t/1000)%(60*60))/60)).slice(-2);
      let seconds = ('0' + Math.floor((t/1000)%60)).slice(-2);
      return (<div>{hours}:{minutes}:{seconds}</div>);
    }

    startTimer(){
    	if(this.state.timerOn===false){
    		this.setState({timerOn: true});
    		this.inter = setInterval(this.countDown.bind(this), 1000);
      }
      if(this.state.currentCycle===0){
        this.setState({
          currentCycle: 1
        });
      }

    }

    stopTimer(){
      this.setState({timerOn: false});
      clearInterval(this.inter);
      this.inter=0;
    }

    skipTimer(){
      if(this.state.currentCycle===0){
        this.setState({
          currentCycle: 1
        })
      }
      this.timerZero();
    }

    resetTimer(){
      this.stopTimer();
      this.setState({
        currentCycle: 0,
        shortBreak: false,
        longBreak: false,
        timer: this.state.pomodoroLength
      })
      }

    countDown(){
      const {timer} = this.state;
      if(this.state.timerOn === true){        
        let newTime = timer - 1000;
        this.setState({timer: newTime});

      }
      if (timer===0) {
        this.audio.play();
        this.timerZero();
      }
    } 

    timerZero(){
      this.stopTimer();
      if (this.state.shortBreak||this.state.longBreak) {
        let nextCycle = this.state.longBreak ? 0 : this.state.currentCycle+1;
        this.setState({
          shortBreak: false,
          longBreak: false,
          timer: this.state.pomodoroLength,
          currentCycle: nextCycle
        });

      } else {
        if(this.state.currentCycle>=this.state.cycles){
          this.setState({
            timer: this.state.longBreakLength,
            longBreak: true
          });
        } else {
          this.setState({
            timer: this.state.shortBreakLength,
            shortBreak: true
          });
        }        
      }
      console.log(this.state.currentCycle+" "+ this.state.cycles+" "+this.state.longBreak);
    }

    submit = () => {
    confirmAlert({
      title: 'Restart',
      message: 'Are you sure you want to stop?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.resetTimer()
        },
        {
          label: 'No',
          
        }
      ]
    })
    }

    handleSettings(event) {
      event.preventDefault();

      const target = event.target;
      let workTime = target.pomodoroLength.value*60*1000;
      let shortBreakTime = target.shortBreakLength.value*60*1000;
      let longBreakTime = target.longBreakLength.value*60*1000;

      this.setState({
        timer: workTime,
        timerOn: false,
        pomodoroLength: workTime,
        shortBreakLength: shortBreakTime,
        longBreakLength: longBreakTime,
        cycles: target.cycles.value
      });
    }

    settingsPopUp = () => {
      let workTime = Math.floor(((this.state.pomodoroLength/1000)%(60*60))/60);
      let shortBreakTime = Math.floor(((this.state.shortBreakLength/1000)%(60*60))/60);
      let longBreakTime = Math.floor(((this.state.longBreakLength/1000)%(60*60))/60);

      confirmAlert({
        customUI: ({onClose}) => {
            return (
              <div className='settings-popup'>
                <h1>Settings</h1>
                <form id="settings-form" onSubmit={this.handleSettings}>
                  <h3>Work duration</h3>
                  <input type="number" name="pomodoroLength" min="1" step="1" defaultValue={workTime} />
                  <h3>Short Break duration</h3>
                  <input type="number" name="shortBreakLength" min="1" step="1" defaultValue={shortBreakTime}/>
                  <h3>Long Break duration</h3>
                  <input type="number" name="longBreakLength" min="1" step="1" defaultValue={longBreakTime}/>
                  <h3>Work Sessions</h3>
                  <input type="number" name="cycles" min="1" max="10" step="1" defaultValue={this.state.cycles}/>
                  <br/>
                  <input className="submit-button" type="submit" value="Save" />
                </form>
                <button onClick={()=>{onClose()}}>Close</button>

              </div>
            )
          }
      })
    }



  render() {
      const {timer} = this.state; 

      let tDisplay = this.formatTimer(timer);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tomate App</h1>
        </header>
        <button className = "skip-button" onClick={()=>this.skipTimer()}> Skip </button>
        <ToggleButton running={this.state.timerOn} stopTimer={this.stopTimer} startTimer={this.startTimer} />
        <button className = "reset-button" onClick={this.submit}> Reset </button>
        <div className = "timer">{tDisplay}</div>
        <CyclesContainer cycles={this.state.cycles} currentCycle={this.state.currentCycle} />
        <ShowActiveMode shortBreak={this.state.shortBreak} longBreak={this.state.longBreak} />
        <button className = "settings-button" onClick={this.settingsPopUp} > Settings </button>
      </div>
    );
  }
}

export default App;