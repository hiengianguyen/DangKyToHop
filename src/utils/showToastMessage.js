const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const successBtn = $(".btn__success");
const errorBtn = $(".btn__error");
const elementToastErr = $(".toast-error");
const close = $(".toast__close");

function toastMessage(title = "", message = "", type = "info", duration = 3000, icon = "✅", fadeOut = 1000, widths = "400px") {
  const main = document.querySelector("#toast");
  main.style.width = widths;

  if (main) {
    const toast = document.createElement("div");
    var autoRemoveID = setTimeout(function () {
      main.removeChild(toast);
    }, duration + fadeOut);

    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveID);
      }
    };
    const delay = (duration / 1000).toFixed(2);
    toast.style.animation = `sideInLeft ease 1s, fadeOut 1s ${delay}s forwards`;
    toast.style.width = "100%";
    toast.classList.add("toasts", `toast-${type}`);
    toast.innerHTML = `
            <div class="toast__icon">
                <i style="font-style: normal;">${icon}</i>
            </div>
            <div class="toast__body">
              <h3 class="toast__title">${title}</h3>
              <p class="toast__message m-0">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            `;

    main.appendChild(toast);
  }
}
