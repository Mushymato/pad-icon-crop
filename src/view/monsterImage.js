import React from "react";

import monsterList from "data/monsterList";

class MonsterImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monsterNo: "5392",
      att1: 5,
      att2: 3,
      isActive: props.isActive,
      cardFrameStyle: {
        top: props.position.y,
        left: props.position.x
      },
      cardFrameSize: props.size,
      error: ""
    }
  }

  // renderCardFrame(att1, att2) {
  //   if (att2 !== 0) {
  //     mergeImages([`${process.env.PUBLIC_URL}/frames/m${att1}.png`, `${process.env.PUBLIC_URL}/frames/s${att2}.png`])
  //       .then(cardFrame => this.setState({ cardFrame }))
  //       .catch(error => this.setState({ error: error.toString() }));
  //   } else {
  //     this.setState({ cardFrame: `${process.env.PUBLIC_URL}/frames/m${att1}.png` })
  //   }
  // }

  componentDidMount() {
    if (this.props.monsterNo in monsterList) {
      this.setState({
        monsterNo: this.props.monsterNo,
        att1: monsterList[this.props.monsterNo].ATT1,
        att2: monsterList[this.props.monsterNo].ATT2
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.monsterNo in monsterList) {
      this.setState({
        monsterNo: nextProps.monsterNo,
        att1: monsterList[nextProps.monsterNo].ATT1,
        att2: monsterList[nextProps.monsterNo].ATT2
      });
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

  componentDidUpdate() {
    // draw new card icon
    const newMonsterIcon = this.refs.newMonsterIcon
    const newMonsterIconCTX = newMonsterIcon.getContext("2d")
    newMonsterIconCTX.clearRect(0, 0, newMonsterIcon.width, newMonsterIcon.height);
    const monsterImg = this.refs.monsterImg
    newMonsterIconCTX.drawImage(monsterImg,
      this.state.cardFrameStyle.left, this.state.cardFrameStyle.top,
      this.state.size, this.state.size,
      5, 5,
      this.state.cardFrameSize - 10, this.state.cardFrameSize - 10)
    // draw card frames
    const cardFrame = this.refs.cardFrame
    const cardFrameCTX = this.refs.cardFrame.getContext("2d")
    cardFrameCTX.clearRect(0, 0, cardFrame.width, cardFrame.height);
    const mainAtt = new Image(this.state.size, this.state.size)
    mainAtt.src = `${process.env.PUBLIC_URL}/frames/m${this.state.att1}.png`
    cardFrameCTX.drawImage(mainAtt, 0, 0, this.state.size, this.state.size)
    newMonsterIconCTX.drawImage(mainAtt, 0, 0)
    if (this.state.att2 !== 0) {
      const subAtt = new Image(this.state.size, this.state.size)
      subAtt.src = `${process.env.PUBLIC_URL}/frames/s${this.state.att2}.png`
      cardFrameCTX.drawImage(subAtt, 0, 0, this.state.size, this.state.size)
      newMonsterIconCTX.drawImage(subAtt, 0, 0)
    }
  }

  downloadIcon(monsterNo) {

  }

  render() {
    return (
      <React.Fragment>
        <canvas id="cardFrame" ref="cardFrame" style={this.state.cardFrameStyle} width={200} height={200} />
        <img src={`${process.env.PUBLIC_URL}/full/${this.state.monsterNo}.png`} id="monsterImg" ref="monsterImg" alt={`img-${this.state.monsterNo}`} />
        <canvas id="newMonsterIcon" ref="newMonsterIcon" width={100} height={100} />
      </React.Fragment>
    );
  }
}

export default MonsterImage;