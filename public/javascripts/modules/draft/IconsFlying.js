import React from 'react'
import {Icon} from 'antd'

export default class IconsFlying extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.container}>
          <Icon type="car" style={styles.left} className='play-around-left' />
          {/* <Icon type="safety" style={styles.bottom} className='play-around-bottom'/>
          <Icon type="setting" style={styles.right} className='play-around-right'/>
          <Icon type="like-o" style={styles.top} className='play-around-top'/> */}
          <Icon type="tool" style={styles.center} className='center-icon'/>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    width: 60,
    height: 60,
    position: 'relative',
  },
  left: {
    fontSize: 20,
    // paddingBottom: 100,
  },
  bottom: {
    fontSize: 20,
    // paddingTop: 180,
  },
  right: {
    fontSize: 20,
    // paddingTop: 180,
    // paddingLeft: 180,
  },
  top: {
    fontSize: 20,
    // paddingLeft: 180,
  },
  center: {
    fontSize: 20,
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#fa541c',
  },
}
