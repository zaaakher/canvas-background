import React, { Component } from "react";
import "./App.css";
import grid from "./assets/grid.svg";
import list from "./assets/list.svg";
let arr = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  432,
  423,
  423,
  425,
  3245,
  34,
  456,
  45,
  2345,
  345,
  46,
  3456,
  345,
  3145,
  1234,
  234,
  234,
  54,
  423,
  423,
  423,
  525,
  324,
  2,
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "list",
      key: new Date(),
      width: 0,
      height: 0,
      list: [],
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      key: new Date(),
    });
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.setState({ list: arr });
  }
  componentWillMount() {
    this.updateWindowDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  handleRefresh() {
    this.setState({ key: new Date() });
  }
  render() {
    // container
    //  options-container
    //    filter-container
    //    view-container
    //  list-container
    //    content-container
    return (
      <div onClick={this.handleRefresh} className="container">
        <div className="options-container">
          <div className="view-container">
            <div
              onClick={() => this.setState({ view: "grid" })}
              style={{
                backgroundColor: this.state.view === "grid" ? "#dadada" : "white",
              }}
            >
              <img width={16} height={16} src={grid} />
            </div>
            <div
              onClick={() => this.setState({ view: "list" })}
              style={{
                backgroundColor: this.state.view === "list" ? "#dadada" : "white",
              }}
            >
              <img width={16} height={16} src={list} />
            </div>
          </div>
        </div>
        <div className="list-container">
          {this.state.list.map((l) => (
            <div key={l * Math.random()} className="project-container">
              <div className="content-container">
                <div>{"Title: " + l}</div>
                <div>
                  <p>testing this thing</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
