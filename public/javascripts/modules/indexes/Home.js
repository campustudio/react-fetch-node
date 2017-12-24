import React from 'react';

export default class Home extends React.Component {
  home() {
    console.log('excel-export')
  }

  render() {
    return (
      <div><a onClick={this.home} style={{cursor:'pointer'}}>excel-export</a></div>
    );
  }
}
