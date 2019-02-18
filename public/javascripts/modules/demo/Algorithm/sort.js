const bubbleSortF = (arr) => {
  let newArr = [
    ...arr,
  ]
  const len = newArr.length
  for (let outer=len; outer>=2; outer--) {
    for (let inner=0; inner<outer-1; inner++) {
      if (newArr[inner] > newArr[inner+1]) {
        [newArr[inner], newArr[inner+1]] = [newArr[inner+1], newArr[inner]]
      }
    }
  }

  return newArr;
}

module.exports = {
  bubbleSortF,
}
