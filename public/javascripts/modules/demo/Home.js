import React from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
import { netRequestGet } from '../../common/asyncFun'
import Sidebar from './Sidebar'
import IconsFlying from './visual/IconsFlying'

class Home extends React.Component {
  constructor(props) {
    super(props)
    // console.log('Home constructor this: ', this)
    console.log('Home constructor this.__proto__: ', this.__proto__)
    // console.log('Home constructor this.prototype: ', this.prototype)
    // console.log('Home constructor props: ', props)
    // console.log('Home compare props === this.props: ', props === this.props)
    // this.addPropForHins = 'addPropForHins'
  }

  componentDidMount() {
    this.props.setUserProfile({name: 'Yui'})
    setTimeout(() => {
      this.props.onApiRequest() // blocked by CORS policy
    }, 1500)
    netRequestGet('/sina', ()=>{}, (res)=>{
      console.log('res: ', res); // ??
      console.log('res.json(): ', res.json()); // ?
      console.log('res.body: ', res.body);

    })
  }

  onTestPrototype() {
    console.log('onTestPrototype this: ', this)
    console.log('onTestPrototype this.__proto__: ', this.__proto__)
    // console.log('onTestPrototype this.prototype: ', this.prototype)
  }

  render() {
    console.log('this.props: ', this.props);

    return (
      <div>
        {/* <a onClick={this.onTestPrototype.bind(this)}>test prototype</a> */}
        {/* {this.props.userProfile.name} */}
        <Sidebar/>
        <div style={{border:'1px solid red',paddingLeft:220}}>
          {this.props.children ? this.props.children : <IconsFlying/>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  userProfile: state.userProfile,
  userPlusProp: `${state.userProfile.name} ${props.aRandomProp}` 
})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUserProfile: (profile) => dispatch(actions.setUserProfile(profile)),
//   }
// }

// const mapDispatchToProps = (dispatch, props) => {
//   return bindActionCreators({
//     setUserProfile: actions.setUserProfile,
//   }, dispatch)
// }

const mapActionsToProps = {
  setUserProfile: actions.setUserProfile,
  onApiRequest: actions.apiRequest
}

// const mapActionsToProps = (dispatch, props) => {
//   return bindActionCreators({
//     setUserProfile: actions.setUserProfile,
//   }, dispatch)
// }

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  console.log(propsFromState, propsFromDispatch, ownProps);
  return {}
}

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default connect(mapStateToProps, mapActionsToProps)(Home)
// Uncaught TypeError: this.props.setUserProfile is not a function ???
// export default connect(mapStateToProps, mapActionsToProps, mergeProps)(Home)

// let homeInstance = new Home()
// console.log('homeInstance: ', homeInstance)
// console.log('homeInstance.__proto__: ', homeInstance.__proto__)
// console.log('homeInstance.prototype: ', homeInstance.prototype)
// console.log('homeInstance.addPropForHins: ', homeInstance.addPropForHins)

// class SubHome extends Home {
//   constructor(props) {
//     super(props)
//     console.log('SubHome constructor this: ', this)
//     console.log('SubHome constructor this.__proto__: ', this.__proto__)
//     // console.log('SubHome constructor this.prototype: ', this.prototype)
//     // console.log('SubHome constructor props: ', props)
//     // console.log('SubHome compare props === this.props: ', props === this.props)
//   }
// }

// let subHomeInstance = new SubHome()
// console.log('subHomeInstance: ', subHomeInstance)
// console.log('subHomeInstance.addPropForHins: ', subHomeInstance.addPropForHins)
