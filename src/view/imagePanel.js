import React from "react";
import mergeImages from "merge-images";
import ReactCursorPosition, { INTERACTIONS } from "react-cursor-position";

import monsterList from "data/monsterList";

class MonsterImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monsterNo: "5392",
      att1: 0,
      att2: 0,
      cardFrame: "",
      isActive: this.props.isActive,
      cardFrameStyle: {
        top: this.props.position.y,
        left: this.props.position.x
      },
      cardFrameSize: this.props.size,
      error: ""
    }
  }

  renderCardFrame(att1, att2) {
    if (att2 !== 0) {
      mergeImages([`${process.env.PUBLIC_URL}/frames/m${att1}.png`, `${process.env.PUBLIC_URL}/frames/s${att2}.png`])
        .then(cardFrame => this.setState({ cardFrame }))
        .catch(error => this.setState({ error: error.toString() }));
    } else {
      this.setState({ cardFrame: `${process.env.PUBLIC_URL}/frames/m${att1}.png` })
    }
  }

  componentDidMount() {
    if (this.props.monsterNo in monsterList) {
      this.setState({
        monsterNo: this.props.monsterNo,
        att1: monsterList[this.props.monsterNo].ATT1,
        att2: monsterList[this.props.monsterNo].ATT2
      });
    }
    this.renderCardFrame(this.state.att1, this.state.att2)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.monsterNo in monsterList) {
      this.setState({
        monsterNo: nextProps.monsterNo,
        att1: monsterList[nextProps.monsterNo].ATT1,
        att2: monsterList[nextProps.monsterNo].ATT2
      });
      this.renderCardFrame(monsterList[nextProps.monsterNo].ATT1, monsterList[nextProps.monsterNo].ATT2)
    }
    if (nextProps.isActive !== this.state.isActive) {
      this.setState({ isActive: nextProps.isActive })
    }
    if (this.state.isActive) {
      this.setState({
        cardFrameStyle: {
          top: nextProps.position.y,
          left: nextProps.position.x
        }
      })
    }
    this.setState({
      size: nextProps.size
    })
  }

  render() {
    return (
      <React.Fragment>
        <img src={this.state.cardFrame} id="cardFrame" alt="cardFrame" style={this.state.cardFrameStyle} height={this.state.size} width={this.state.size} />
        <img src={`${process.env.PUBLIC_URL}/full/${this.state.monsterNo}.png`} id="monsterImg" alt={`img-${this.state.monsterNo}`} />
      </React.Fragment>
    );
  }
}

class ImagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterNo: "5392",
      size: "100"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleWheel(e) {
    let newSize = parseInt(this.state.size) + parseInt(e.deltaY / 10);
    if (newSize >= 0 && newSize <= 200) {
      this.setState({
        size: newSize
      })
    }
  }
  render() {
    return (
      <div onWheel={this.handleWheel}>
        <div id="monsterNo" className="inputDiv">
          <span>No. </span>
          <input type="text" name="monsterNo" value={this.state.monsterNo} onChange={this.handleChange} maxLength="4" />
        </div>
        <ReactCursorPosition className="ImagePanel" activationInteractionMouse={INTERACTIONS.CLICK}>
          <MonsterImage
            monsterNo={this.state.monsterNo}
            size={this.state.size}
          />
        </ReactCursorPosition>
        <div id="cardFrameSize" className="inputDiv">
          <span>Size: </span>
          <input type="range" name="size" min="0" max="200" value={this.state.size} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}



export default ImagePanel;