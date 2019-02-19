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
      randomNumArrS: [],
    },
    this.bsF = this.bsF.bind(this)
  }

  // bsF = () => { // babel support arrow function??
  bsF() {
    this.setState({
      randomNumArrB: sort.bubbleSortF(randomNumArr),
    })
  }

  ssF() {

  }

  render() {
    const {randomNumArrB, randomNumArrS} = this.state

    return (
      <div className='font'>
        {randomContainerF(randomNumArr)}
        <button className='button' onClick={this.bsF}>Bubble Sort</button>
        {randomContainerF(randomNumArrB)}
        <button className='button' onClick={this.ssF}>Select Sort</button>
        {randomContainerF(randomNumArrS)}
      </div>
    )
  }
}

export default Algorithm
