const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btnGenrate = document.querySelector(".btn_genrate");
const spinner = document.querySelector(".spinner");
const qrCode = document.querySelector(".qrcode");
const qrContainer = document.querySelector(".qr_container");
const btnDownload = document.querySelector(".btn_download");
const btn_new = document.querySelector(".btn_new");
const errorMsg = document.querySelector(".error_msg");

function onSubmit(e) {
  e.preventDefault();
  const inputValue = input.value;

  if (inputValue === "") {
    return show(errorMsg);
  }

  show(spinner);
  hide(form);
  hide(errorMsg);

  setTimeout(() => {
    hide(spinner);
    show(qrContainer);
    genrateQr(inputValue);

    setTimeout(() => {
      setLink();
    }, 50);
  }, 1000);
}

function genrateQr(inputValue) {
  const qr = new QRCode(qrCode, {
    text: inputValue,
    width: 200,
    height: 200,
  });
}

function setLink() {
  const link = qrCode.querySelector("img").src;
  btnDownload.setAttribute("href", link);
}

function clear() {
  btnDownload.setAttribute("href", "");
  qrCode.innerHTML = "";
  input.value = "";
}

function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "flex";
}

function genrateNewQr() {
  hide(qrContainer);
  show(spinner);
  setTimeout(() => {
    hide(spinner);
    show(form);
    clear();
  }, 1000);
}

form.addEventListener("submit", onSubmit);
btn_new.addEventListener("click", genrateNewQr);
