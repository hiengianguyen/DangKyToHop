module.exports = {
  eq: (a, b) => a === b,
  not: (a) => !a,
  includes: (a, b) => a.includes(b),
  returnDes: (obj, b) => {
    if (obj.name == b) {
      return true;
    } else return false;
  },
  showSideBar: (isNotHomePage, isNotSideBar) => {
    if (isNotSideBar === true) return false;
    if (isNotHomePage === true || isNotHomePage === undefined) return true;
    return false;
  },
  textBadge: (status) => {
    let result;
    switch (status) {
      case "approved":
        result = "Đã phê duyệt";
        break;
      case "rejected":
        result = "Không phê duyệt";
        break;
      default:
        result = "Đã nộp";
        break;
    }
    return result;
  },
  colorBadge: (status) => {
    let result;
    switch (status) {
      case "approved":
        result = "#198754";
        break;
      case "rejected":
        result = "#dc3545";
        break;
      default:
        result = "#6c757d";
        break;
    }
    return result;
  }
};
