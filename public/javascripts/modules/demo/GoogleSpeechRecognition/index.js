import React, {Fragment} from 'react'  // eslint-disable-line

export default class GoogleSpeechRecognition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transcript: 'okay google...',
    }
    this.onRecognition = this.onRecognition.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.monitor = null
  }

  componentDidMount() {
    const self = this
    self.onRecognition()
    this.monitor = setInterval(() => {
      self.onRecognition()
    }, 5000);
  }

  onRecognition() {
    console.log('onRecognition')
    const self = this

    const recognition = new webkitSpeechRecognition()  // eslint-disable-line
    recognition.onresult = function(event) {
      let results = event.results[event.resultIndex][0].transcript.toLowerCase()
      console.log(results)
      self.setState({
        transcript: results,
      })
      if (results == 'open battle') { // should be recognized by Wit.ai api, then do sth
        self.setState({
          showGally: true,
        })
      }
      if (results == 'close battle') {
        self.setState({
          showGally: false,
        })
      }
      if (results == 'stop monitor') {
        clearInterval(self.monitor)
      }
    }
    recognition.start()
  }

  onInputChange() {
    console.log('onInputChange')
  }

  render() {
    const {transcript, showGally} = this.state

    return (
      <Fragment>
        <input value={transcript} onChange={this.onInputChange}/>
        {
          showGally &&
          <img src='../../../../images/gally.jpg'/>
        }
      </Fragment>
    )
  }
}
