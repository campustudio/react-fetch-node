import React from 'react';
import PropTypes from 'prop-types';

const data = [
  {name: 'CSS'},
  {name: 'JavaScript'}
]

export default class EventListener extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // document.body.addEventListener('click', () => {
    //   this.setState({
    //     showSidebar: false
    //   })
    // })

    document.querySelector('#sidebar').addEventListener('click', (e) => {
      // e.stopPropagation()
    })
  }

  showSidebar(a, b, c) {
    console.log('a: ', a);
    console.log('a.target: ', a.target);
    console.log('a.currentTarget: ', a.currentTarget);
    console.log('a.nativeEvent: ', a.nativeEvent);
    console.log('a.nativeEvent.target: ', a.nativeEvent.target);
    console.log('a.nativeEvent.currentTarget: ', a.nativeEvent.currentTarget);
    console.log('b: ', b);
    console.log('c: ', c);
    

    // e.preventDefault()

    this.setState({
      showSidebar: true
    })

    // e.preventDefault()
  }

  componentWillUnmount() {
    document.body.removeEventListener('click')
    document.querySelector('#sidebar').removeEventListener('click')
  }

  render() {
    const {dataSource} = this.props
    const {showSidebar} = this.state

    return (
      <div>
        <div onClick={this.showSidebar.bind(this)} style={{display:'inline-block',cursor:'pointer'}}>X</div>
        <div onClick={this.showSidebar.bind(this)} style={{float:'right',cursor:'pointer'}}>X</div>
        <div style={{border:'1px solid blue'}}>XY</div>
        <div style={{border:'1px solid blue'}}>XY</div>
        {
          showSidebar &&
          <div style={{background:'black',opacity:0.5,zIndex:1,position:'absolute',top:0,right:0,bottom:0,left:200}}></div>
        }
        <aside id='sidebar' style={{display:showSidebar ? '' : 'none',width:200,background:'#fff',position:'fixed',bottom:0,top:0}}>
          <ul>
            {
              dataSource.map((item, index) => {
                return <li key={index}>{item.name}</li>
              })
            }
          </ul>
        </aside>
      </div>
    )
  }
}

EventListener.defaultProps = {
  dataSource: data
}

EventListener.propTypes = {
  dataSource: PropTypes.array
}