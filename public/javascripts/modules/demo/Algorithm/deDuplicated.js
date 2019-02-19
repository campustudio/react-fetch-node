const deDuplicatedF = (arr) => {
  let newArr = []
  for (var i = 0; i<arr.length; i++) {
    for (var j=0, refLen=newArr.length; j<refLen; j++) {
      if (arr[i] === newArr[j]) {
        break;
      }
    }

    if (j === refLen) {
      newArr.push(arr[i])
    }
  }

  return newArr
}

module.exports = {
  deDuplicatedF,
}
