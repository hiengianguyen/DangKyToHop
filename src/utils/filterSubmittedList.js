function filterSubmittedList() {
  let result;
  const valueName = searchName.value;
  const valueGender = Array.from(radioGenders).find((radio) => {
    return radio.checked;
  }).value;
  const valueRadio1 = Array.from(radioCombinations1).find((radio) => {
    return radio.checked;
  }).value;
  const valueRadio2 = Array.from(radioCombinations2).find((radio) => {
    return radio.checked;
  }).value;

  //filter combination 1,2.
  if (valueRadio1 === "all" && valueRadio2 !== "all") {
    result = data.filter((doc, index) => {
      return doc.combination2.includes(valueRadio2);
    });
  } else if (valueRadio2 === "all" && valueRadio1 !== "all") {
    result = data.filter((doc, index) => {
      return doc.combination1.includes(valueRadio1);
    });
  } else {
    if (valueRadio2 === "all" && valueRadio1 === "all") {
      result = data;
    } else {
      result = data.filter((doc) => {
        return doc.combination1.includes(valueRadio1) && doc.combination2.includes(valueRadio2);
      });
    }
  }

  if (result.length === 0) {
    renderCardSubmitted(containerSubmitted, []);
    return [];
  }

  //filter Gender.
  if (valueGender !== "all") {
    result = result.filter((doc) => {
      return doc.gender === valueGender;
    });
  }

  if (result.length === 0) {
    renderCardSubmitted(containerSubmitted, []);
    return [];
  }

  //filter Name.
  if (valueName !== "") {
    result = result.filter((doc) => {
      return removeVI(doc.fullName, { replaceSpecialCharacters: false }).includes(removeVI(valueName, { replaceSpecialCharacters: false }));
    });
  }

  renderCardSubmitted(containerSubmitted, result);
  return result;
}
