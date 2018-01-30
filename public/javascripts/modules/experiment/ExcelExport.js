import React from 'react'

export default class ExcelExport extends React.Component { 
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
      <a onClick={this.home} style={{cursor: 'pointer'}}>excel-export</a>
    )
  }
}
