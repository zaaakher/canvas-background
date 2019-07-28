import React from "react";
import paper from "paper";
import {
  getRandomInt,
  //   getRandomElement,
  //   getRandomArbitrary,
  makeGrid,
  remapNumbers
} from "./util";
class BackgroundCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: {
        columns: this.props.width / 40,
        rows: this.props.height / 40,
        color: "black",
        size:8
      }
    };
  }
  componentDidMount() {
    paper.setup(this.canvas);
    paper.project.clear();
    // this.drawing(this.props);
    this.plusSigns(this.state.properties);

    // patterns[this.state.properties.pattern](this.state.properties);
    // paper.project.view.scale(0.8);
  }
  componentDidUpdate() {
    paper.setup(this.canvas);
    paper.project.clear();
    // patterns[this.state.properties.pattern](this.state.properties);
    // this.drawing(this.props);
    this.plusSigns(this.state.properties);
    // paper.project.view.scale(0.8);
  }

  plusSigns(props) {
    let gridGroup = makeGrid(props.columns, props.rows);
    gridGroup.children.map((cell, i) => {
      let ln = new paper.Path.Line(
        cell.bounds.topLeft,
        cell.bounds.bottomRight
      );
      let ln2 = new paper.Path.Line(
        cell.bounds.topRight,
        cell.bounds.bottomLeft
      );
      let gr = new paper.Group([ln, ln2]);
      gr.strokeColor = props.color;
      gr.strokeCap = "round";
      gr.strokeWidth = props.strokeSize;
      let n = getRandomInt(0, 5);
      if (n <= 3) {
        gr.rotate(45);
        gr.onFrame = function() {
          this.rotate(1);
        };
      }
      gr.scale(remapNumbers(props.size, [0.1, 20], [0.1, 2]));
      return cell;
    });
    gridGroup.remove();
  }
  drawing(props) {
    let background = new paper.Path.Rectangle(
      new paper.Point(0, 0),
      new paper.Size(window.innerWidth, window.innerHeight)
    );
    background.fillColor = "#14283A";

    var count = 50;

    // Create a symbol, which we will use to place instances of later:
    var cir = new paper.Path.Circle({
      center: [0, 0],
      radius: 5,
      fillColor: "white",
      strokeColor: "#14283A"
    });

    var symbol = new paper.Symbol(cir);
    let startsGroup = new paper.Group();
    // Place the instances of the symbol:
    for (var i = 0; i < count; i++) {
      // The center position is a random point in the view:
      //   let p = new paper.Point.random()

      var center = new paper.Point(
        Math.random() * paper.view.bounds.width,
        Math.random() * paper.view.bounds.height
      );
      var placed = symbol.place(center);
      placed.scale(i / count + 0.001);
      placed.data.vector = new paper.Point({
        angle: Math.random() * 360,
        length: ((i / count) * Math.random()) / 5
      });
      startsGroup.addChild(placed);
    }

    var vector = new paper.Point({
      angle: 45,
      length: 0
    });

    var mouseVector = vector.clone();

    paper.view.onMouseMove = function(event) {
      mouseVector = paper.view.center - event.point;
      return false; // Prevent touch scrolling
    };

    let stars = paper.project.activeLayer.children[1].children;
    // let speed = Math.random();
    paper.view.onFrame = function(event) {
      vector = vector + (mouseVector - vector) / 30;
      stars.map(function(item, k) {
        if (k % 2 === 0) {
          item.position.x += 0.3;
        } else {
          item.position.x += 0.6;
        }
        var position = item.position;
        var viewBounds = paper.view.bounds;
        if (position.isInside(viewBounds)) return position;
        var itemBounds = item.bounds;
        if (position.x > viewBounds.width + 5) {
          position.x = -item.bounds.width;
        }

        if (position.x < -itemBounds.width - 5) {
          position.x = viewBounds.width;
        }

        if (position.y > viewBounds.height + 5) {
          position.y = -itemBounds.height;
        }

        if (position.y < -itemBounds.height - 5) {
          position.y = viewBounds.height;
        }
        return item;
      });
    };
  }
  render() {
    return (
      <canvas
        ref={ref => (this.canvas = ref)}
        // style={{ backgroundColor: "red" }}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default BackgroundCanvas;
