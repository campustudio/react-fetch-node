import React, {Component} from 'react'
import store from './store'
import sort from './sort'
import './styles.css'
import randomContainer from './randomContainer'

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
        {randomContainer(randomNumArr)}
        <button className='button' onClick={this.bsF}>Bubble Sort</button>
        {randomContainer(randomNumArrB)}
        <button className='button' onClick={this.ssF}>Select Sort</button>
        {randomContainer(randomNumArrS)}
      </div>
    )
  }
}

export default Algorithm
