var jsrmvi = (function (a) {
  "use strict";
  var b = (function (a, b) {
      return (
        (b = {
          exports: {}
        }),
        a(b, b.exports),
        b.exports
      );
    })(function (a, b) {
      Object.defineProperty(b, "__esModule", {
        value: !0
      }),
        (b.DefaultOption = b.removeVI = void 0);
      var d = [
          {
            char: "a",
            regex: /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g
          },
          {
            char: "e",
            regex: /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g
          },
          {
            char: "i",
            regex: /ì|í|ị|ỉ|ĩ/g
          },
          {
            char: "o",
            regex: /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g
          },
          {
            char: "u",
            regex: /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g
          },
          {
            char: "y",
            regex: /ỳ|ý|ỵ|ỷ|ỹ/g
          },
          {
            char: "d",
            regex: /đ/g
          }
        ],
        e = [
          {
            char: "A",
            regex: /À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g
          },
          {
            char: "E",
            regex: /È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g
          },
          {
            char: "I",
            regex: /Ì|Í|Ị|Ỉ|Ĩ/g
          },
          {
            char: "O",
            regex: /Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g
          },
          {
            char: "U",
            regex: /Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g
          },
          {
            char: "Y",
            regex: /Ỳ|Ý|Ỵ|Ỷ|Ỹ/g
          },
          {
            char: "D",
            regex: /Đ/g
          }
        ],
        f = {
          ignoreCase: !0,
          replaceSpecialCharacters: !0,
          concatBy: "-"
        };
      (b.DefaultOption = f),
        (b.removeVI = function (a, b) {
          void 0 === a && (a = ""), void 0 === b && (b = f);
          var g = b.ignoreCase,
            h = void 0 === g ? f.ignoreCase : g,
            i = b.replaceSpecialCharacters,
            j = void 0 === i ? f.replaceSpecialCharacters : i,
            k = b.concatBy,
            l = void 0 === k ? f.concatBy : k,
            m = a || "";
          if (
            (h && (m = m.toLowerCase()),
            d.forEach(function (a) {
              m = m.replace(a.regex, a.char);
            }),
            h ||
              e.forEach(function (a) {
                m = m.replace(a.regex, a.char);
              }),
            j)
          ) {
            var n = l;
            m = m
              .replace(/!|@|%|\^|\*|\(|\)|\+|\-|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_|\|/g, n)
              .replace(new RegExp("\\" + n + "+\\" + n, "g"), n)
              .replace(new RegExp("^\\" + n + "+|\\" + n + "+$", "g"), "");
          }
          return m;
        });
      var g = {
        removeVI: b.removeVI,
        DefaultOption: f
      };
      b.default = g;
    }),
    c = (function (a) {
      return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a["default"] : a;
    })(b),
    d = b.DefaultOption,
    e = b.removeVI;
  return (a.DefaultOption = d), (a.default = c), (a.removeVI = e), a;
})({});

export { jsrmvi };
