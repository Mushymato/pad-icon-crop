import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactCursorPosition, { INTERACTIONS } from "react-cursor-position";

import MonsterImage from './view/monsterImage';

class ImagePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monsterNo: "5392",
            size: "100",
            monsterImageData: null
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
        if (newSize >= 1 && newSize <= 200) {
            this.setState({
                size: newSize
            })
        }
    }
    render() {
        return (
            <div id="imagePanel" onWheel={this.handleWheel}>
                <div id="monsterNo" className="inputDiv">
                    <span>No. </span>
                    <input type="text" name="monsterNo" value={this.state.monsterNo} onChange={this.handleChange} maxLength="4" />
                </div>
                <ReactCursorPosition className="monsterImageBox" activationInteractionMouse={INTERACTIONS.CLICK}>
                    <MonsterImage
                        monsterNo={this.state.monsterNo}
                        size={this.state.size}
                    />
                </ReactCursorPosition>
            </div>
        );
    }
}

ReactDOM.render(<ImagePanel />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();