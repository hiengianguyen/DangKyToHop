module.exports = {
  eq: (a, b) => a === b,
  not: (a) => !a,
  includes: (a, b) => a.includes(b),
  returnDes: (obj, b) => {
    if (obj.name == b) {
      return true;
    } else return false;
  }
};
