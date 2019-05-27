import React from 'react';
import forEach from 'lodash/forEach';
import Hole from '../Hole.component/Hole.component';
import Disk from '../Disk.component/Disk.component';
import Modal from 'react-modal';


const PLAYER_ONE_COLOR = "red";
const PLAYER_TWO_COLOR = "black";
const NUM_IN_A_ROW = 4;
const NUM_TO_START_CHECK = NUM_IN_A_ROW * 2 - 1;
const COLS_NUM = 7;
const ROWS_NUM = 7

export default class BoardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 0;
    this.diskStyle = {}
    this.numInRow = 1;

    //base proprty
    this.state = {
      holesState: {},
      right: 0,
      top: 0,
      playerPlay: "playerOne",
      playerColor: PLAYER_ONE_COLOR,
      openModel:false,
      close:true
    }

  }

  componentDidMount() {
    this.pushColArray();
  }

  createBoard = () => {
    const cols = [];
    let linesArr = [];
    let linesIndex = 1;
    let colsIndex = 1;
    forEach(this.state.holesState, (lines) => {
      linesArr = [];
      linesIndex = 1;
      forEach(lines, (value) => {
        linesArr.push(
          <div className="holediv row row${linesIndex}" key={"i" + "" + Math.random()}>
            <Hole color={value.color} myx={colsIndex} myy={linesIndex} />
          </div>);
        linesIndex++;
      });
      cols.push(<div key={Math.random() + "col"} className={` col-xs`}>{linesArr.reverse()}</div>)
      colsIndex++;
    });
    return cols;
  }


  pushColArray = () => {
    let holesState = {};
    let lines = {};
    for (let i = 1; i <= COLS_NUM; i++) {
      lines = {};
      for (let j = 1; j <= ROWS_NUM; j++) {
        lines[`line${j}`] = { isFull: false, color: "" };
      }
      holesState[`column${i}`] = lines;
    }
    this.setState({ holesState });
  }

  makeHolder = () => {
    let Holder = []
    for (let i = 1; i <= COLS_NUM; i++) {
      Holder.push(
        <div key={Math.random() + "holder"} id={"hol" + i} className="col-xs holder">
          <button id={"hol" + i} onClick={(e) => { this.move(e, i) }}></button>
        </div>)
    }
    return Holder;
  }

  animateMove = (top, left) => {
    let styleSheet = document.styleSheets[2];
    debugger

    let keyframes =
      `@-webkit-keyframes ${this.state.animationName} {
        0% {position:"absolute" ,left:${left} ; top:${top} ;} 
        50% { position:"absolute",left:"50px"; top:"80px";}
        100% { position:"absolute", left:"0px"; top:"0px";}
    }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }



  move = (element, column) => {

    const lineNum = this.setColomLinesCount(column)
    if (lineNum < 7) {
      this.counter++;
      let copiedHolesState = Object.assign({}, this.state.holesState);
      const singleHoleObj = copiedHolesState[`column${column}`][`line${lineNum}`];
      singleHoleObj.color = this.state.playerColor;
      singleHoleObj.isFull = true;
      singleHoleObj.column = column;
      singleHoleObj.row = lineNum;
      this.setState({ holesState: copiedHolesState });

      if (NUM_TO_START_CHECK <= this.counter) {
        const { column, row } = singleHoleObj;
        if (!this.checkWinner(column, row)) {
          this.switchPlayer(this.state.playerPlay)
        }
      }
      else {
        this.switchPlayer(this.state.playerPlay)
      }
    }
    else {
      alert("the column is full try other")
    }

  }




  setColomLinesCount = (id) => {
    let fulllines;
    const lines = this.state.holesState[`column${id}`];
    for (var i = 1; i <= ROWS_NUM; i++) {
      if (!lines[`line${i}`].isFull) {
        fulllines = i;
        break;
      }
    }

    return fulllines;
  }
  doWinner = () => {
   // alert();
    this.setState({openModel:true,
      modelAlert:`${this.state.playerPlay} with the color ${this.state.playerColor} is the winnner!!!`      });

      

  }

  checkWinner = (theHoleX, theHoleY) => {
    this.chekTopRight(theHoleX, theHoleY);
    this.numInRow === NUM_IN_A_ROW ? this.doWinner() : "";
    this.chekBottomLeft(theHoleX, theHoleY);
    this.numInRow === NUM_IN_A_ROW ? this.doWinner() : "";
    this.numInRow = 1;
    this.chekRight(theHoleX, theHoleY);
    this.numInRow === NUM_IN_A_ROW ? this.doWinner() : "";
    this.chekLeft(theHoleX, theHoleY);
    this.numInRow === NUM_IN_A_ROW ? this.doWinner() : "";
    this.numInRow = 1;
    this.chekBottomRight(theHoleX, theHoleY);
    this.numInRow === 4 ? this.doWinner() : "";
    this.chekTopLeft(theHoleX, theHoleY);
    this.numInRow === NUM_IN_A_ROW ? this.doWinner() : "";
    this.numInRow = 1;
    this.chekBottom(theHoleX, theHoleY);
    this.numInRow === NUM_IN_A_ROW ? this.doWinner() : "";
    return false;
  }

  chekTopRight = (x, y) => {
    if (x + 1 <= COLS_NUM && y + 1 < ROWS_NUM) {
      if (this.state.holesState[`column${x + 1}`][`line${y + 1}`].color == this.state.playerColor) {
        this.numInRow++;
        x = x + 1;
        y = y + 1;
        this.chekTopRight(x, y);
      }
    }
  }
  chekBottomLeft = (x, y) => {
    if (x - 1 > 0 && y - 1 > 0) {
      if (this.state.holesState[`column${x - 1}`][`line${y - 1}`].color == this.state.playerColor) {
        this.numInRow++;
        x = x - 1;
        y = y - 1;
        this.chekBottomLeft(x, y);
      }
    }
  }


  chekRight = (x, y) => {
    if (x + 1 <= COLS_NUM) {
      if (this.state.holesState[`column${x + 1}`][`line${y}`].color == this.state.playerColor) {
        this.numInRow++;
        x = x + 1;
        this.chekRight(x, y);
      }
    }
  }
  chekLeft = (x, y) => {
    if (x - 1 > 0) {
      if (this.state.holesState[`column${x - 1}`][`line${y}`].color == this.state.playerColor) {
        this.numInRow++;
        x = x - 1;
        this.chekLeft(x, y);
      }
    }
  }
  chekBottomRight = (x, y) => {

    if (x + 1 <= COLS_NUM && y - 1 > 0) {
      if (this.state.holesState[`column${x + 1}`][`line${y - 1}`].color == this.state.playerColor) {
        this.numInRow++;
        x = x + 1;
        y = y - 1;
        this.chekBottomRight(x, y);
      }
    }
  }
  chekTopLeft = (x, y) => {
    if (x - 1 > 0 && y + 1 < ROWS_NUM) {
      if (this.state.holesState[`column${x - 1}`][`line${y + 1}`].color == this.state.playerColor) {
        this.numInRow++;
        x = x - 1;
        y = y + 1;
        this.chekTopLeft(x, y);
      }
    }
  }
  chekBottom = (x, y) => {
    if (y - 1 > 0) {
      if (this.state.holesState[`column${x}`][`line${y - 1}`].color == this.state.playerColor) {
        this.numInRow++;
        y = y - 1;
        this.chekBottom(x, y);
      }
    }
  }


  switchPlayer = (player) => {
    let switchedPlayer;
    let playerColor;
    if (player == "playerOne") {
      switchedPlayer = "playerTwo";
      playerColor = PLAYER_TWO_COLOR;
    }
    else {
      switchedPlayer = "playerOne";
      playerColor = PLAYER_ONE_COLOR;
    }
    this.numInRow = 1;
    this.setState({
      playerPlay: switchedPlayer,
      playerColor: playerColor
    })
    this.diskStyle = {
      right: " 50px",
      position: "absolute",
      top: "30px",
      "margin": "0 0 0 0px",
      color: this.state.playerColor
    };
  }
  
close=()=>{ 
  this.setState({  openModel:false});
  this.pushColArray(); 
}




  render() {

    return (
      <div className="board-wrap">
        <div className="container board" >
          <div className="wrap-up">
            {
              this.makeHolder()
            }
          </div>
          <div className="row">
            {
              this.createBoard()
            }
          </div>
        </div>
        <div className="diskwrap" >
        
          <Disk backcolor={this.state.playerColor} ></Disk>
          <h2>now play {this.state.playerColor} </h2>
        </div>
        <Modal
    isOpen={!!this.state.openModel}
       contentLabel="Selected Option"
    closeTimeoutMS={200}
    className="modal"
    ariaHideApp={false}
  >
    <h3 className="modal__title">{this.state.modelAlert}</h3>
 
    <button className="button" onClick={this.close}>Okay</button>
  </Modal>
      </div>

    )
  }


}
