import React from 'react';


export class DiskComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="disk"  style={{backgroundColor :this.props.backcolor}}>
      </div>

    )
  }

}

export default DiskComponent;
