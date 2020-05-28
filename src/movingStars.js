import * as paper from "paper";

const movingStars = function (sp) {
  // const paper = require("paper");
  // paper.setup(canvas);
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

  let f = sp.fg;
  let b = sp.bg;
  paper.view.onFrame = function (event) {
    vector = vector + (mouseVector - vector) / 30;
    stars.map(function (item, k) {
      if (k % 2 === 0) {
        item.position.x += f;

        // console.log(vector);
      } else {
        item.position.x += b;
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
};

export default movingStars;
