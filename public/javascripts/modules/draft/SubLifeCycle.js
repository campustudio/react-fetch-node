import React from 'react'
import PropTypes from 'prop-types'

// 基本类型组件
export default class SubLifeCycle extends React.Component {
  constructor(props) {
    console.log('SubLifeCycle constructor');
    super(props)
    this.state = {
      subName: this.props.subName
    }
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    console.log('SubLifeCycle componentWillMount');
    
  }

  render() {
    console.log('SubLifeCycle render this.props.subName: ', this.props.subName);
    console.log('SubLifeCycle render this.state.subName: ', this.state.subName);

    return (
      <article>
        <h1>Sub Life Cycle {this.props.subName}</h1>
        <h1>Sub Life Cycle {this.state.subName}</h1>
      </article>   
    )    
  }

  componentDidMount() {
    console.log('SubLifeCycle componentDidMount');
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    console.log('SubLifeCycle componentWillReceiveProps this.props: ', this.props);
    console.log('SubLifeCycle componentWillReceiveProps nextProps: ', nextProps);
    this.setState({
      subName: nextProps.subName // sync new prop to state
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('SubLifeCycle shouldComponentUpdate nextProps: ', nextProps);
    console.log('SubLifeCycle shouldComponentUpdate nextState: ', nextState);
    return true
  }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUpdate(nextProps, nextState) {
    console.log('SubLifeCycle componentWillUpdate nextProps: ', nextProps);
    console.log('SubLifeCycle componentWillUpdate nextState: ', nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('SubLifeCycle componentDidUpdate prevProps: ', prevProps);
    console.log('SubLifeCycle componentDidUpdate prevState: ', prevState);
  }

  componentWillUnmount() {
    console.log('SubLifeCycle componentWillUnmount');
  }
}

SubLifeCycle.defaultProps = {
  subName: 'default subName1',
}

SubLifeCycle.propTypes = {
  subName: PropTypes.string
}