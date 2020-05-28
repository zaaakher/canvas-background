import React from "react";
import * as paper from "paper";
import movingStars from "../movingStars";

class PaperCanvas extends React.Component {
  componentDidMount() {
    paper.setup(this.canvas);
    paper.project.clear();
    movingStars({ fg: 0.1, bg: 0.05 });
  }

  componentDidUpdate() {
    paper.setup(this.canvas);
    paper.project.clear();
    movingStars({ fg: 0.1, bg: 0.05 });
  }

  render() {
    return (
      <div>
        <canvas
          id="myCanvas"
          ref={(ref) => {
            this.canvas = ref;
          }}
          width={window.innerWidth}
          height={window.innerHeight}
          className="canvas-container"
        />
      </div>
    );
  }
}

export default PaperCanvas;
