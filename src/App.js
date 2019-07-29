import React, { Component } from "react";
import "./App.css";

import BackgroundCanvas from "./BackgroundCanvas";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { key: new Date(), width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      key: new Date()
    });
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillMount() {
    this.updateWindowDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BackgroundCanvas
          key={this.state.key}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }
}

export default App;
