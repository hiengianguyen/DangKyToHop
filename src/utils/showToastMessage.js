const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const successBtn = $(".btn__success");
const errorBtn = $(".btn__error");
const elementToastErr = $(".toast-error");
const close = $(".toast__close");

// function toast
function toastMessage({ tittle = "", message = "", type = "", duration = 3000, icon = "", fadeOut = 1000, widths = "400px" }) {
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
                <i class="fa-solid ${icon}"></i>
            </div>
            <div class="toast__body">
              <h3 class="toast__tittle">${tittle}</h3>
              <p class="toast__message">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            `;

    main.appendChild(toast);
  }
}
