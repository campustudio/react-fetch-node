import React from 'react'
import PropTypes from 'prop-types'

// 基本类型组件
export default class LifeCycle extends React.Component {
  constructor(props) {
    console.log('into constructor')
    console.log('props: ', props);
    super(props)
    console.log('into constructor this: ', this)
    console.log('into constructor this.defaultProps: ', this.defaultProps)
    console.log('into constructor this.props: ', this.props)
    console.log('into constructor this.state: ', this.state)
    this.state = {
      name: this.props.name
    }
    this.anything = {a: 'a'}
    console.log('into constructor this.state: ', this.state)
    console.log('into constructor this.anything: ', this.anything)
  }

  componentWillMount() {
    console.log('into componentWillMount')
  }

  render() {
    console.log('into render');
    return (
      <article>
        <h1>Life Cycle</h1>
        <p>initial</p>
        <p>props update</p>
        <p>unmount</p>
        <MyFunctionalComponent/>
      </article>   
    )    
  }

  componentDidMount() {
    console.log('into componentDidMount')
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
    
  }
}

LifeCycle.defaultProps = {
  name: 'default name1',
  // name: 0,
}

LifeCycle.propTypes = {
  name: PropTypes.string
}

// 功能型组件
const MyFunctionalComponent = (props) => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}

MyFunctionalComponent.defaultProps = {
  name: 'default name2'
}