import React from 'react'
import {Chart, Geom, Coord} from "bizcharts";

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

export default class Bizchart extends React.Component {
  render() {
    return (
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
      </div>
    )
  }
} 