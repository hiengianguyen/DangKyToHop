import { jsrmvi } from "/jsrmvi.js";
const { removeVI } = jsrmvi;

function filterSubmittedList(data) {
  let result;
  const searchName = document.getElementById("search-name-inp");
  const valueName = searchName.value;
  const containerSubmitted = document.getElementById("container-submitted");
  const radioGenders = document.getElementById("radios-gender").querySelectorAll("input");
  const radioCombinations1 = document.getElementById("radios-combination-1").querySelectorAll("input");
  const radioCombinations2 = document.getElementById("radios-combination-2").querySelectorAll("input");
  const radioIsApprove = document.getElementById("radios-is-approve").querySelectorAll("input");

  const valueGender = Array.from(radioGenders).find((radio) => {
    return radio.checked;
  }).value;
  const valueRadio1 = Array.from(radioCombinations1).find((radio) => {
    return radio.checked;
  }).value;
  const valueRadio2 = Array.from(radioCombinations2).find((radio) => {
    return radio.checked;
  }).value;

  let valueRadioApprove = Array.from(radioIsApprove).find((radio) => {
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

  //filter Approve
  if (valueRadioApprove !== "all") {
    valueRadioApprove = valueRadioApprove === "true";
    result = result.filter((doc) => {
      return doc.isApprove === valueRadioApprove;
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

export { filterSubmittedList };
