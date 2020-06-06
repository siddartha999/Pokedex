const retrieveMaxNumber = (data) => {
  let val = Number.MIN_SAFE_INTEGER;
  for (let point of data) {
    if (val < point.value) {
      val = point.value;
    }
  }
  return val;
};

export default retrieveMaxNumber;
