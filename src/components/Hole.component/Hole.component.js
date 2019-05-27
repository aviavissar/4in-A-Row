import React from 'react';


export class HoleComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="hole" style={{ backgroundColor: this.props.color }}>
            </div>
        )
    }
}


export default HoleComponent;
