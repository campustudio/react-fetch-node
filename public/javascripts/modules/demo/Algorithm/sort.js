const bubbleSortF = (arr) => {
  let newArr = [
    ...arr,
  ]
  const len = newArr.length
  for (let outer=len; outer>=2; outer--) { // critical value
    for (let inner=0; inner<outer-1; inner++) { // critical value
      if (newArr[inner] > newArr[inner+1]) {
        // ES6解构赋值
        [newArr[inner], newArr[inner+1]] = [newArr[inner+1], newArr[inner]]
      }
    }
  }

  return newArr;
}

const quickSortF = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  let left = []
  let right = []
  // const base = arr.splice(0, 1)
  const base = arr[parseInt(arr.length/2, 10)]

  for (let i=0; i<arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i])
    } else if (arr[i] > base) {
      right.push(arr[i])
    }
  }

  return quickSortF(left).concat(base, quickSortF(right))
}

module.exports = {
  bubbleSortF,
  quickSortF,
}
