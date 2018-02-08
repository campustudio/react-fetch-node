import React from 'react'
import {Icon} from 'antd'

export default class IconsFlying extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.container}>
          <Icon type="car" style={styles.left} className='play-around-left' />
          <Icon type="safety" style={styles.bottom} className='play-around-bottom'/>
          <Icon type="tool" style={styles.right} className='play-around-right'/>
          <Icon type="like-o" style={styles.top} className='play-around-top'/>
          <Icon type="setting" style={styles.center} className='center-icon'/>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  left: {
    fontSize: 20,
    paddingBottom: 100,
  },
  bottom: {
    fontSize: 20,
    paddingTop: 180,
  },
  right: {
    fontSize: 20,
    paddingTop: 180,
    paddingLeft: 180,
  },
  top: {
    fontSize: 20,
    paddingLeft: 180,
  },
  center: {
    fontSize: 20,
    marginTop: 90,
    marginLeft: 75,
    color: '#fa541c',
  },
}
