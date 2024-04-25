import React, { Component, Fragment } from "react";
import store from "./store";
import sort from "./sort";
import eventHandle from "./eventHandle";
import "./styles.css";
import StlViewer from "./StlViewer";
import StlGroupViewer from "./StlGroupViewer";
// import AsyncCascader from '@campustudio/vehicle-ui/src/components/AsyncCascader'

const randomNumArr = store.randomNumArrF() || [];
let debounceTimeout;
let initialT = new Date().getTime();

class Algorithm extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      randomNumArrB: [],
      randomNumArrQ: [],
      inputBuffer: [],
      stls: [],
    }),
      (this.bsF = this.bsF.bind(this));
    this.qsF = this.qsF.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.page = 1;
    this.pageCount = 0;
  }

  componentDidMount() {
    console.log("componentDidMount: ");
    this.getStls(this.page);
    this.getDisatnce();

    window.addEventListener("scroll", (e) => {
      let st = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      if (!st) {
        console.log("top");
      } else if (
        st + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        console.log("bottom");
        // this.getStls(2);
      }
    });
  }

  getDisatnce = () => {
    fetch("/stl/distance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("getDisatnce", data);
      });
  };

  getStls = (page) => {
    const { stls = [] } = this.state;
    fetch("/stl/stls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        limit: 8,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("getStls", data);
        if (data && data.code === 0) {
          let resStls = data.resFiles;
          this.pageCount = data.pageCount;
          // console.log('resStls: ', resStls);
          if (resStls && Array.isArray(resStls) && resStls.length > 0) {
            if (page >= 1) {
              for (let i = 0; i < 8; i++) {
                if (
                  document.getElementById(`part${i}`) &&
                  document.getElementById(`part${i}`).childNodes[0]
                ) {
                  document
                    .getElementById(`part${i}`)
                    .removeChild(
                      document.getElementById(`part${i}`).childNodes[0]
                    );
                }
              }
            }
            this.setState({
              // stls: stls.concat(resStls),
              stls: resStls,
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  // bsF = () => { // babel support arrow function??
  bsF() {
    this.setState({
      randomNumArrB: sort.bubbleSortF(randomNumArr),
    });
  }

  qsF() {
    this.setState({
      randomNumArrQ: sort.quickSortF(randomNumArr),
    });
  }

  onInputChange(e) {
    const now = new Date().getTime();
    const value = e.target.value;
    const _this = this;

    // TODO: still an issue for the the first input, will handle later
    debounceTimeout = setTimeout(() => {
      if (now - initialT < 3000) {
        clearTimeout(debounceTimeout);
      } else {
        console.log(value);
        _this.setState({
          inputBuffer: [..._this.state.inputBuffer, value],
        });
        initialT = new Date().getTime();
      }
    }, 3000);
  }

  render() {
    const { randomNumArrB, randomNumArrQ, inputBuffer, stls } = this.state;

    return (
      <div className="font">
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
        <header
          style={{
            width: 1280,
            height: 30,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => this.getStls(--this.page)}
            disabled={this.page === 1}
            style={{
              borderRadius: 5,
              cursor: this.page === 1 ? "not-allowed" : "pointer",
            }}
          >
            last group
          </button>
          <span style={{ lineHeight: "30px", padding: "0 30px" }}>
            3D PARTS DEMO
          </span>
          <button
            onClick={() => this.getStls(++this.page)}
            disabled={this.page >= this.pageCount}
            style={{
              borderRadius: 5,
              cursor: this.page >= this.pageCount ? "not-allowed" : "pointer",
            }}
          >
            next group
          </button>
        </header>
        <hr />
        <div style={{ width: 1280, margin: "0 auto" }}>
          {stls.map((s, i) => {
            return <StlViewer key={i} selfDomId={`part${i}`} filePath={s} />;
          })}
          {/* {
            stls.length > 0
              && (
                <StlGroupViewer
                  selfDomId="part1"
                  files={stls}
                  renderSize={1250}
                />
              )
          } */}
        </div>
      </div>
    );
  }
}

export default Algorithm;
