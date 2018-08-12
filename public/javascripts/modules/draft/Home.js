import React from 'react'
import PrettyPieChart from './PrettyPieChart'
import IconsFlying from './IconsFlying'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    console.log('Home constructor this: ', this)
    console.log('Home constructor this.__proto__: ', this.__proto__)
    console.log('Home compare this == this.__proto__: ', this == this.__proto__)
    // console.log('Home constructor this.prototype: ', this.prototype)
    // console.log('Home constructor props: ', props)
    // console.log('Home compare props === this.props: ', props === this.props)
    // this.addPropForHins = 'addPropForHins'
  }

  onTestPrototype() {
    console.log('onTestPrototype this: ', this)
    console.log('onTestPrototype this.__proto__: ', this.__proto__)
    // console.log('onTestPrototype this.prototype: ', this.prototype)
  }

  render() {
    return (
      <div>
        <a onClick={this.onTestPrototype.bind(this)}>test prototype</a>
        <IconsFlying/>
      </div>
    )
  }
}

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
