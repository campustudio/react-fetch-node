import React from 'react'
import { getMaxFrequencyChar, removeDuplicated, reverseString } from '../../common/dataHandleFun'

const TestString = () => {
  let maxFreqChar = getMaxFrequencyChar('asdfghjklaqwertyuiopiaia')
  console.log('maxFreqChar: ', maxFreqChar)
  console.log('removeDuplicated: ', removeDuplicated(['1', '2', '3', '1', 'a', 'b', 'b']))
  console.log('reverseString: ', reverseString('gnirts esrever'))

  return <div>TestString</div>
}

export default TestString