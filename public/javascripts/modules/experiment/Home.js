import React from 'react'
import PrettyPieChart from './PrettyPieChart'
import IconsFlying from './IconsFlying'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    console.log('000constructor this: ', this)
    console.log('000constructor this.__proto__: ', this.__proto__)
    console.log('000compare this&this.__proto__: ', this == this.__proto__)
    // console.log('000constructor this.prototype: ', this.prototype)
    // console.log('000constructor props: ', props)
    // console.log('000compare props: ', props === this.props)

    // this.addPropForHins = 'addPropForHins'
  }

  testPrototype() {
    console.log('111testPrototype this: ', this)
    console.log('111testPrototype this.__proto__: ', this.__proto__)
    // console.log('111testPrototype this.prototype: ', this.prototype)
  }

  render() {
    return (
      <div>
        <a onClick={this.testPrototype.bind(this)}>test prototype</a>
      </div>
    )
  }
}

// let hins = new Home()
// console.log('222hins: ', hins)
// console.log('222hins.__proto__: ', hins.__proto__)
// console.log('222hins.prototype: ', hins.prototype)
// console.log('222hins.addPropForHins: ', hins.addPropForHins)

// class SubHome extends Home {
//   constructor(props) {
//     super(props)
//     console.log('333constructor this: ', this)
//     console.log('333constructor this.__proto__: ', this.__proto__)
//     // console.log('333constructor this.prototype: ', this.prototype)
//     // console.log('333constructor props: ', props)
//     // console.log('333compare props: ', props === this.props)
//   }
// }

// let shins = new SubHome()
// console.log('444shins: ', shins)
// console.log('444shins.addPropForHins: ', shins.addPropForHins)
