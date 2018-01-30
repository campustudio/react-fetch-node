import React from 'react'
import { Pie, yuan } from 'ant-design-pro/lib/Charts'

const salesPieData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  }
]

export default class AntChart extends React.Component {
  render() {
    return (
      <Pie
        hasLegend
        subTitle="销售额"
        height={180}
        data={salesPieData}
        total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
        valueFormat={val => yuan(val)}
      />
    )
  }
} 