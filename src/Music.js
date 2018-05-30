import React from 'react';

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = { play: true };
    this.url = "http://streaming.tdiradio.com:8000/house.mp3";
    this.audio = new Audio(this.url);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    this.setState({ play: !this.state.play });
    console.log(this.state.play);
    this.state.play ? this.audio.play() : this.audio.pause();
  }

  render() {
    return (
      <div>
        <button onClick={this.togglePlay}>{this.state.play}</button>
      </div>
    );
  }
}

export default Music;
