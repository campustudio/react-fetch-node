import React, {Component, Fragment} from 'react'
import store from './store'
import './styles.css'

class Algorithm extends Component {
  render() {
    const randomNumArr = store._randomNumArr() || []

    return (
      <div className='font'>
        <Fragment>
          {
            randomNumArr.map((num, idx) => {
              return <div key={idx}>{num}</div>
            })
          }
        </Fragment>
        <Fragment>
          <button className='button'>Bubble Sort</button>
          <button className='button'>Select Sort</button>
        </Fragment>
      </div>
    )
  }
}

export default Algorithm
