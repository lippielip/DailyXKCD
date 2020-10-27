import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      highestNum: 0
    };
    this.getNewImage = this.getNewImage.bind(this);
  }
  async getNewImage() {
    try {
      await fetch("https://xkcd.now.sh/?comic=latest")
        .then(response => response.json())
        .then(data => this.setState({ highestNum: data.num }))
      let randomNum = Math.floor(Math.random() * Math.floor(this.state.highestNum))
      await fetch(`https://xkcd.now.sh/?comic=${randomNum}`)
        .then(response => response.json())
        .then(data => this.setState({ data: data }));
      setTimeout(() => {
        this.getNewImage();
      }, 1800000);
    } catch (error) {
      document.getElementById("errorDiv").innerHTML="Error fetching posts. Retrying..."
      setTimeout(() => {
        this.getNewImage();
      }, 60000);
    }
  }
  componentDidMount() {
    this.getNewImage();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.data.title}</h1>
          </header>
          <div className="App-body">
            <img src={this.state.data.img} className="App-content" alt="comic of the day" />
            <div id="errorDiv" />
          </div>
      </div>
    );
  }
}

export default App;
