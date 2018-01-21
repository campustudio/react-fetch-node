import React from 'react'
import {Chart, Geom, Coord} from "bizcharts";
import { Pie, yuan } from 'ant-design-pro/lib/Charts'
import PieChart from 'react-minimal-pie-chart'

const { DataView } = DataSet;
const data = [
  { item: '可使用金额', count: 0 },
  { item: '冻结金额', count: 0 }
];
const dv = new DataView();
dv.source(data).transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
});

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

export default class Home extends React.Component { 
  home() {
    console.log('excel-export')

    const rows = [
      ['name1', 'city1', 'some other info'], ['name2', 'city2', 'more info'],
    ]
    let csvContent = 'data:text/csv;charset=utf-8,'
    rows.forEach(function(rowArray) {
      let row = rowArray.join(',')
      csvContent += row + '\r\n' // add carriage return
    })

    let encodedUri = encodeURI(csvContent)
    window.open(encodedUri)
  }

  render() {
    return (
      <div>
        <a onClick={this.home} style={{cursor: 'pointer'}}>excel-export</a>
        <div id='mini-pie'>
          <Chart height={100} width={100} data={dv} padding={[ 80, 100, 80, 80 ]}>
            <Coord type={'theta'} radius={0.75} innerRadius={0.6}/>
            <Geom
              type="intervalStack"
              position="percent"
              color='item'
              >
            </Geom>
          </Chart>
          <Pie
            hasLegend
            subTitle="销售额"
            height={180}
            data={salesPieData}
            total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
            valueFormat={val => yuan(val)}
          />
          <PieChart
            lineWidth={20}
            style={{height: 50}}
            data={[
              { value: 10, key: 1, color: '#E38627' },
              { value: 15, key: 2, color: '#C13C37' },
              { value: 20, key: 3, color: '#6A2135' },
            ]}
          />
        </div>
      </div>
    )
  }
}
