import React from 'react'
import PieChart from 'react-minimal-pie-chart'

export default class PrettyPieChart extends React.Component {
  render() {
    return (
      <PieChart
        lineWidth={20}
        style={{height: 50}}
        data={[
          { value: 10, key: 1, color: '#E38627' },
          { value: 15, key: 2, color: '#C13C37' },
          { value: 20, key: 3, color: '#6A2135' },
        ]}
      />
    )
  }
} 