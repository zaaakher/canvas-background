import React from "react";
import paper from "paper";

import { getRandomInt, makeGrid, remapNumbers } from "./util";
import movingStars from "./movingStars";
let div = getRandomInt(20, 50);
// let div = 40;

class BackgroundCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: new Date(),
      properties: {
        // columns: this.props.width / div,
        // rows: this.props.height / div,
        columns: 5,
        rows: 5,
        color: "black",
        size: 10,

        // size: getRandomInt(2, 10),
        strokeSize: 2,
      },
    };
  }
  componentDidMount() {
    paper.setup(this.canvas);
    paper.project.clear();
    this.plusSigns(this.state.properties);
    let t = paper.project.activeLayer.children;
    // t.strokeColor = 'red';
    // t.strokeWidth = 10
    console.log(t);
  }
  componentDidUpdate() {
    paper.setup(this.canvas);
    paper.project.clear();
    this.plusSigns(this.state.properties);
  }

  updateCanva(k) {
    this.setState({ key: new Date() });
  }
  plusSigns(props) {
    let gridGroup = makeGrid(props.columns, props.rows);
    gridGroup.view.center.set(paper.project.view.center);
    // let n = getRandomInt(0, 5);
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
      // console.log("rotation " + gr.rotation);
      // console.log("n = ", n);
      let rot = 0;
      if (n <= 3) {
        gr.onFrame = function (e) {
          this.rotation++;
          rot++;
          if (rot == 90) {
            rot = 0;
            console.log("full cycle");
            // return;
          }
        };
        // updateCanv();
        // that.setState({ key: new Date() });
      }

      // console.log()
      // if (gr.rotation == 360 || gr.rotation == 0) {
      //   n = getRandomInt(0, 5);
      //     gr.onFrame = function () {
      //       // gr.rotate(45);
      //       this.rotate(2);
      //       // n = getRandom Int(0, 5);
      //     };
      //   }
      // gr.scale(remapNumbers(props.size, [0.1, 20], [0.1, 2]));
      //   gr.opacity = 0.2;
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
      strokeColor: "#14283A",
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
        length: ((i / count) * Math.random()) / 5,
      });
      startsGroup.addChild(placed);
    }

    var vector = new paper.Point({
      angle: 45,
      length: 0,
    });

    var mouseVector = vector.clone();

    paper.view.onMouseMove = function (event) {
      mouseVector = paper.view.center - event.point;
      return false; // Prevent touch scrolling
    };

    let stars = paper.project.activeLayer.children[1].children;
    // let speed = Math.random();
    paper.view.onFrame = function (event) {
      vector = vector + (mouseVector - vector) / 30;
      stars.map(function (item, k) {
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
      <div key={this.state.key} onClick={this.handleRefresh}>
        <canvas
          id="myCanvas"
          ref={(ref) => (this.canvas = ref)}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}

export default BackgroundCanvas;
