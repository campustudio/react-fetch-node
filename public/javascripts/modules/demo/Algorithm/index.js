import React, {Component, Fragment} from 'react'
import store from './store'
import sort from './sort'
import eventHandle from './eventHandle'
import './styles.css'
import randomContainerF from './randomContainerF'

const randomNumArr = store.randomNumArrF() || []
let debounceTimeout
let initialT = new Date().getTime()

class Algorithm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      randomNumArrB: [],
      randomNumArrQ: [],
      inputBuffer: [],
    },
    this.bsF = this.bsF.bind(this)
    this.qsF = this.qsF.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
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

  onInputChange(e) {
    const now = new Date().getTime()
    const value = e.target.value
    const _this = this

    // TODO: still an issue for the the first input, will handle later
    debounceTimeout = setTimeout(() => {
      if (now - initialT < 3000) {
        clearTimeout(debounceTimeout)
      } else {
        console.log(value)
        _this.setState({
          inputBuffer: [
            ..._this.state.inputBuffer,
            value,
          ],
        })
        initialT = new Date().getTime()
      }
    }, 3000)
  }

  render() {
    const {randomNumArrB, randomNumArrQ, inputBuffer} = this.state

    return (
      <div className='font'>
        {randomContainerF(randomNumArr)}
        <button className='button' onClick={this.bsF}>Bubble Sort</button>
        {randomContainerF(randomNumArrB)}
        <button className='button' onClick={this.qsF}>Quick Sort</button>
        {randomContainerF(randomNumArrQ)}
        <hr/>
        <Fragment>
          <label>Debounce Test:</label>
          <input onChange={this.onInputChange}/>
          <span>
            Only output the value per 3s, no matter how many chars you input within 3s.
          </span>
          <ul>
            {
              inputBuffer.map((val, idx) => {
                return <li key={idx}>{val}</li>
              })
            }
          </ul>
        </Fragment>
        <Fragment>
          
        </Fragment>
        <hr/>
      </div>
    )
  }
}

export default Algorithm
