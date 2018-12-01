import React, { Component } from "react";
import { Match, Icon } from "../../";
import "./MatchList.scss";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      marginLeft: 0,
      matchesWindowWidth: 0,
      matchListWidth: 0,
      marginMax: 0,
      isHoveringLeft: false,
      isHoveringRight: false,
      currentInterval: null
    };
  }

  componentDidMount() {
    this.setState({
      matchesWindowWidth: this.matchesWindow.offsetWidth,
      matchListWidth: this.matchList.offsetWidth,
      marginMax: this.matchList.offsetWidth - this.matchesWindow.offsetWidth
    });
  }

  setMoveInterval = (moveAmount) => {
    return setInterval(() => {
      if (moveAmount > 0) {
        // moving left
        if (this.state.marginLeft <= 0) {
          this.setState({marginLeft: this.state.marginLeft + moveAmount});
        }
      }
      else {
        // moving right
        if (Math.abs(this.state.marginLeft) < this.state.marginMax) {
          this.setState({marginLeft: this.state.marginLeft + moveAmount});
        }
      }
    }, 1);
  }

  hoverLeft = (amt) => {
    if (this.state.marginLeft <= 0) {
      var interval = this.setMoveInterval(amt);
      this.setState({
        isHoveringLeft: true,
        currentInterval: interval
      });
    }
  }

  stopHoverLeft = () => {
    if (this.state.isHoveringLeft) {
      clearInterval(this.state.currentInterval);
      this.setState({
        isHoveringLeft: false,
        currentInterval: null,
      });
    }
  }

  hoverRight = (amt) => {
    if (Math.abs(this.state.marginLeft) < this.state.marginMax) {
      var interval = this.setMoveInterval(-1 * amt);
      this.setState({
        isHoveringRight: true,
        currentInterval: interval
      });
    }
  }

  stopHoverRight = () => {
    if (this.state.isHoveringRight) {
      clearInterval(this.state.currentInterval);
      this.setState({
        isHoveringRight: false,
        currentInterval: null,
      });
    }
  }

  render() {
    var matches = this.props.user.matchesData;
    return (
      <div
        className="matches-window"
        ref={matchesWindow => {
          this.matchesWindow = matchesWindow;
        }}
      >
        <div className="left-bar"
          onMouseEnter={() => this.hoverLeft(4)}
          onMouseLeave={this.stopHoverLeft}
        >
          <Icon icon={faArrowLeft} />
        </div>
        <div className="left-bar-fast"
          onMouseEnter={() => this.hoverLeft(10)}
          onMouseLeave={this.stopHoverLeft}
        />
        <div className="right-bar"
          onMouseEnter={() => this.hoverRight(4)}
          onMouseLeave={this.stopHoverRight}
        >
          <Icon icon={faArrowRight} />
        </div>
        <div className="right-bar-fast"
          onMouseEnter={() => this.hoverRight(10)}
          onMouseLeave={this.stopHoverRight}
        />
        <div
          style={{
            marginLeft: this.state.marginLeft + "pt"
          }}
          ref={matchList => {
            this.matchList = matchList;
          }}
          className="match-list-wrapper"
        >
          {matches.map((match, i) => {
            return (
              <div className="tile" key={i}>
                <Match name={match.name} img={match.img} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MatchList;
