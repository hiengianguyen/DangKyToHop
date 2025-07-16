function varidator(selector, option = {}) {
  var formRules = {};

  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var VaridatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập giá trị!";
    },

    min: function (min) {
      return function (value) {
        return value.length >= Number(min) ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự!`;
      };
    },

    max: function (max) {
      return function (value) {
        return value.length <= Number(max) ? undefined : `Vui lòng nhập nhỏ hơn ${max} kí tự!`;
      };
    },

    number: function (value) {
      return isNaN(value) ? "Vui lòng nhập số (Viết liền)!" : undefined;
    },

    length: function (length) {
      return function (value) {
        return value.length === Number(length) ? undefined : `Vui lòng nhập đúng ${length} kí tự!`;
      };
    },

    same: function (value) {
      return value === option.passwordValue() ? undefined : "Vui lòng nhập lại đúng mật khẩu!";
    }
  };

  //lấy form element trong dom
  var formElement = document.querySelector(selector);

  // chỉ xữ lí khi có form element
  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");

    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");
      for (var rule of rules) {
        var isRuleHasValue = rule.includes(":");

        var ruleInfo;
        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }

        var ruleFunc = VaridatorRules[rule];

        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }
      //lắng nghe các sự kiện (blur, change, ...)
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }

    function handleValidate(event) {
      var rules = formRules[event.target.name];
      var errorMessage;

      for (var rule of rules) {
        errorMessage = rule(event.target.value);
        if (errorMessage) break;
      }

      //xử lí khi có lỗi (render lỗi)
      if (errorMessage) {
        var formGroupElement = getParent(event.target, ".form-group");

        if (formGroupElement) {
          formGroupElement.classList.add("invalid");
          var formMessage = formGroupElement.querySelector(".form-message");

          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }
      return !errorMessage;
    }

    function handleClearError() {
      var formGroupElement = getParent(event.target, ".form-group");

      if (formGroupElement.classList.contains("invalid")) {
        formGroupElement.classList.remove("invalid");
        var formMessage = formGroupElement.querySelector(".form-message");

        if (formMessage) {
          formMessage.innerText = "";
        }
      }
    }

    formElement.onsubmit = function (event) {
      event.preventDefault();
      var inputs = formElement.querySelectorAll("[name][rules]");
      var isValid = true;
      for (var input of inputs) {
        if (!handleValidate({ target: input })) {
          isValid = false;
        }
      }

      if (isValid) {
        formElement.submit();
      }
    };
  }
}
