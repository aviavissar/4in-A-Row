import React from 'react';


export class HeaderComponent extends React.Component {
  
  setTextFilter = (txt) => {
    this.setState({
      filterTxt: txt
    })
    this.props.mytext(txt)
  }
  render() {
    return (
      <div className="header container">
        <div className=" row">
          
          
          <div className="logo col-12 col-lg-6">
            <h1><span>4</span>In a Row</h1>
          </div>
        </div>

      </div>
    )
  }
};

export default HeaderComponent;
