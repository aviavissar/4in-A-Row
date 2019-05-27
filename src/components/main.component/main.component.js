import React from 'react';
import HeaderComponent from "../header.component/header.component"
import Board from '../Board.component/Board.component';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            txt:"a"
        }
    }

    render() {
        return (
            <div key="Apps">
                <HeaderComponent mytext={this.mytext}></HeaderComponent>
                <Board></Board>
            </div>
        )
    }
    mytext=(c)=>{
        console.log(c)
        this.setState({txt:c})
    }

}
export default Main;
