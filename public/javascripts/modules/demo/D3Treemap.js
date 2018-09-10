import React from 'react'
import * as d3 from 'd3'

const data = {
  "name": "Eve",
  "children": [
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "children": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
}

const width = 932
const height = 1060

const treemap = data => d3.treemap()
  .size([width, height])
  .padding(1)
  .round(true)
  (d3.hierarchy(data)
  .sum(d => d.size)
  .sort((a, b) => b.height - a.height || b.value - a.value))

// const chart = {
//   const root = treemap(data);

//   const svg = d3.select(DOM.svg(width, height))
//       .style("width", "100%")
//       .style("height", "auto")
//       .style("font", "10px sans-serif");
  
//   const leaf = svg.selectAll("g")
//     .data(root.leaves())
//     .enter().append("g")
//       .attr("transform", d => `translate(${d.x0},${d.y0})`);

//   leaf.append("title")
//       .text(d => `${d.ancestors().reverse().map(d => d.data.name).join("/")}\n${format(d.value)}`);
  
//   leaf.append("rect")
//       .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
//       .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
//       .attr("fill-opacity", 0.6)
//       .attr("width", d => d.x1 - d.x0)
//       .attr("height", d => d.y1 - d.y0);

//   leaf.append("clipPath")
//       .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
//     .append("use")
//       .attr("xlink:href", d => d.leafUid.href);
  
//   leaf.append("text")
//       .attr("clip-path", d => d.clipUid)
//     .selectAll("tspan")
//     .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
//     .enter().append("tspan")
//       .attr("x", 3)
//       .attr("y", (d, i, nodes) => (i === nodes.length - 1) * 3 + 16 + (i - 0.5) * 9)
//       .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
//       .text(d => d);
  
//   return svg.node();
// }

export default class D3Treemap extends React.Component {
  constructor(props) {
    super(props)
  }

  onShow() {
    let p = d3.select("body")
      .selectAll("p")
      .data([4, 8, 15, 16, 23, 42])
      .text(function(d) { return d; });
    
    const root = treemap(data);
    console.log('onShow root: ', root)
    
    const svg = d3.select(DOM.svg(width, height))

  }

  render() {
    return (
      <a onClick={this.onShow.bind(this)}>show sth</a>
    )
  }
} 