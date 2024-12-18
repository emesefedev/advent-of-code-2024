export function frequency(array, element) {
    return array.filter(e => e === element).length
}

export function distancesBetweenElements(array){
    return array
      .slice(1)
      .map((element, idx) => element - array[idx]);
}

export function getMiddleValue(array) {
    if (array.length % 2 === 0) throw new Error("There's no middle value because length is even")

    const middleIdx = Math.floor(array.length / 2)
    return array[middleIdx]
}