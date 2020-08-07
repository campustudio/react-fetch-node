import React, {Component, Fragment} from 'react'
import store from './store'
import sort from './sort'
import eventHandle from './eventHandle'
import './styles.css'
import StlViewer from './StlViewer'
// import AsyncCascader from '@campustudio/vehicle-ui/src/components/AsyncCascader'

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
      stls: [],
    },
    this.bsF = this.bsF.bind(this)
    this.qsF = this.qsF.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount() {
    fetch('/stl/stls', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(
      (res) => res.json()
    ).then((data) => {
      console.log(data)
      if (data && data.code === 0) {
        let stls = data.resFiles;
        if (stls && Array.isArray(stls) && stls.length > 0) {
          this.setState({
            stls: stls.slice(0, 12),
          })
        }
      }
    }).catch((err) => console.log(err))
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
    const {randomNumArrB, randomNumArrQ, inputBuffer, stls} = this.state

    return (
      <div className='font'>
        {/* {randomContainerF(randomNumArr)}
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
          
        </Fragment> */}
        <header style={{width: 1280, height: 30, margin: '0 auto', textAlign: 'center'}}>
          <span style={{lineHeight: '30px'}}>3D PARTS DEMO</span>
        </header>
        <hr/>
        <div style={{width: 1280, margin: '0 auto'}}>
          {
            stls.map((s, i) => {
              return (
                <StlViewer
                  key={i}
                  selfDomId={`part${i}`}
                  filePath={s}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Algorithm
