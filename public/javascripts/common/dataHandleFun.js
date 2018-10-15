// get max frequency char in a str
export const getMaxFrequencyChar = (str) => {
  let strArr = [...str], freqObj = {}
  let maxFreq = 0, maxFreqVal = ''

  strArr.forEach((item, index) => {
    freqObj[item] = freqObj[item] == undefined ? 1 : freqObj[item] + 1 // auto increment

    if(freqObj[item] > maxFreq) {
      maxFreq = freqObj[item] // update maxFreq
      maxFreqVal = item // store the latest max freq val
    }
  })

  // let freqObjArr = Object.keys(freqObj).map((item, index) => {
  //   return {item: freqObj[item]}
  // })

  return maxFreqVal
}

// remove duplicated
export const removeDuplicated = (arr) => {
  let obj = {}
  arr.forEach(item => { // based on uniqueness of the key
    obj[item] = 0
  })

  return Object.keys(obj)
}

// reverse string
export const reverseString = (str) => {
  return [...str].reverse().join('')
}