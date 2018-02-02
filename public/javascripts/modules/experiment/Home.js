import React from 'react'
import PrettyPieChart from './PrettyPieChart'
import {Icon} from 'antd'

export default class Home extends React.Component { 
  render() {
    return (
      <div>
        <div className='header-logo'>
          <PrettyPieChart/>
        </div>
        {/* <div className='play-around'>

        </div> */}
        <div style={{width:200, height:200, position:'relative'}}>
          <Icon type="car" style={{fontSize:20,paddingBottom:'100px'}} className='play-around-left' />
          <Icon type="safety" style={{fontSize:20,paddingTop:180}} className='play-around-bottom'/>
          <Icon type="tool" style={{fontSize:20,paddingTop:180,paddingLeft:180}} className='play-around-right'/>
          <Icon type="like-o" style={{fontSize:20,paddingLeft:180}} className='play-around-top'/>
          <Icon type="setting" style={{fontSize:20,marginTop:90,marginLeft:75,color:'#fa541c'}} className='center-icon'/>
        </div>
        {/* <div style={{width:200, height:200, position:'relative'}}>
          <Icon className='play-around' type="shopping-cart"/>
          <Icon className='play-around' type="compass"/>
          <Icon className='play-around' type="smile-o"/>
          <Icon className='play-around' type="rocket"/>
          <Icon className='play-around' type="dashboard"/>
        </div> */}
        <div style={{width:200, height:200, position:'relative'}}>
          <Icon type="shopping-cart" style={{fontSize:20,paddingBottom:'100px'}} className='play-around-left' />
          <Icon type="smile-o" style={{fontSize:20,paddingTop:180}} className='play-around-bottom'/>
          <Icon type="dashboard" style={{fontSize:20,paddingTop:180,paddingLeft:180}} className='play-around-right'/>
          <Icon type="rocket" style={{fontSize:20,paddingLeft:180}} className='play-around-top'/>
          <Icon type="compass" style={{fontSize:20,marginTop:90,marginLeft:75,color:'#fa541c'}} className='center-icon'/>
        </div>
        
        
      </div>
    )
  }
}
