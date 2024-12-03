export function frequency(array, element) {
    return array.filter(e => e === element).length
}

export function compareArrays(a, b) {
    if (a.length !== b.length) return false
    
    return a.every((element, idx) => element === b[idx]);
}

export function distancesBetweenElements(array){
    return array
      .slice(1)
      .map((element, idx) => element - array[idx]);
  }