export function frequency(array, element) {
    return array.filter(e => e === element).length
}

export function distancesBetweenElements(array){
    return array
      .slice(1)
      .map((element, idx) => element - array[idx]);
  }