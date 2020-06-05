/**
 *This function returns "unique random lists" with random id's picked from the -list.
 *
 * @param {*} list -> Initial List.
 * @param {*} num -> Number of new lists to be generated.
 * @param {*} length -> length of each new list.
 */
const generateRandomLists = (list, num, length) => {
  const newList = new Array(num);
  for (let index = 0; index < num; index++) {
    newList[index] = [];
  }
  let selectedIds = new Set();
  while (length) {
    for (let index = 0; index < newList.length; index++) {
      let randomId = retrieveUniqueNumber(selectedIds, list.length);
      newList[index].push({ ...list[randomId] });
    }
    length--;
  }

  return newList;
};

/**
 * This function returns a "unique random Id".
 * @param {*} retrievedNumbersSet -> already generated random numbers.
 * @param {*} maxNum -> max random number to be generated.
 */

const retrieveUniqueNumber = (retrievedNumbersSet, maxNum) => {
  let uniqueNum = Math.floor(Math.random() * maxNum);
  while (retrievedNumbersSet.has(uniqueNum)) {
    uniqueNum = Math.floor(Math.random * maxNum);
  }
  retrievedNumbersSet.add(uniqueNum);
  return uniqueNum;
};

export default generateRandomLists;
export { retrieveUniqueNumber };
