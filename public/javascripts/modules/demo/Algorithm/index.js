import React, {Component} from 'react'
import store from './store'
import sort from './sort'
import './styles.css'
import randomContainerF from './randomContainerF'

const randomNumArr = store.randomNumArrF() || []

class Algorithm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      randomNumArrB: [],
      randomNumArrQ: [],
    },
    this.bsF = this.bsF.bind(this)
    this.qsF = this.qsF.bind(this)
  }

  // bsF = () => { // babel support arrow function??
  bsF() {
    this.setState({
      randomNumArrB: sort.bubbleSortF(randomNumArr),
    })
  }

  qsF() {
    this.setState({
      randomNumArrQ: sort.quickSortF(randomNumArr),
    })
  }

  render() {
    const {randomNumArrB, randomNumArrQ} = this.state

    return (
      <div className='font'>
        {randomContainerF(randomNumArr)}
        <button className='button' onClick={this.bsF}>Bubble Sort</button>
        {randomContainerF(randomNumArrB)}
        <button className='button' onClick={this.qsF}>Quick Sort</button>
        {randomContainerF(randomNumArrQ)}
      </div>
    )
  }
}

export default Algorithm
