import React from 'react'
import PropTypes from 'prop-types'
import SubLifeCycle from './SubLifeCycle'

// 基本类型组件
export default class LifeCycle extends React.Component {
  constructor(props) {
    console.log('LifeCycle constructor props: ', props);
    super(props)
    console.log('LifeCycle constructor this: ', this)
    console.log('LifeCycle constructor this.defaultProps: ', this.defaultProps)
    console.log('LifeCycle constructor this.props: ', this.props)
    console.log('LifeCycle constructor this.state: ', this.state)
    this.state = {
      name: this.props.name
    }
    this.anything = {a: 'a'}
    console.log('LifeCycle constructor this.state: ', this.state)
    console.log('LifeCycle constructor this.anything: ', this.anything)
  }

  componentWillMount() {
    console.log('LifeCycle componentWillMount')
  }

  render() {
    console.log('LifeCycle render');
    return (
      <article>
        <h1>Life Cycle</h1>
        <p>initial</p>
        <p>props update</p>
        <p>unmount</p>
        <MyFunctionalComponent/>
        <SubLifeCycle subName={this.state.name}/>
      </article>   
    )    
  }

  componentDidMount() {
    console.log('LifeCycle componentDidMount')
    this.setState({
      name: 'new name1'
    })
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