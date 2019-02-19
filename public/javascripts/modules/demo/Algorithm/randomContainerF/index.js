import React from 'react'
import './styles.css'

export default function randomContainerF(arr) {
  return (
    <div className='random-container'>
      {
        arr.map((num, idx) => {
          return <div key={idx}>{`${num}`}</div>
        })
      }
    </div>
  )
}
