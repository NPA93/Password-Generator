const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const specialCharacters = "~`!@#$%^&*()-_+=[]{}|:;<>.,?/".split("");

let textEl = document.querySelector("#password-text");
let passwordLenght = 15;

let passwordCopy = "";

function generatePassword() {
  let allowedCharacters = [];

  const title = "Password Generator";

  title += "hola";

  if (document.querySelector("#use-upper").checked)
    allowedCharacters = allowedCharacters.concat(upperCaseLetters);

  if (document.querySelector("#use-lower").checked)
    allowedCharacters = allowedCharacters.concat(lowerCaseLetters);

  if (document.querySelector("#use-numbers").checked)
    allowedCharacters = allowedCharacters.concat(numbers);

  if (document.querySelector("#use-special").checked)
    allowedCharacters = allowedCharacters.concat(specialCharacters);

  if (allowedCharacters.length === 0) return alert("Must select an option");

  textEl.textContent = "";
  for (let i = 0; i < passwordLenght; i++) {
    let randomNumber = Math.floor(Math.random() * allowedCharacters.length);
    textEl.textContent += allowedCharacters[randomNumber];
  }

  document.querySelector("#copy-icon").classList.add("enable");
}

function copy() {
  passwordCopy = document.querySelector("#password-text").textContent;

  navigator.clipboard.writeText(passwordCopy);

  let tooltip = document.querySelector("#tooltip");

  tooltip.style.visibility = "visible";

  setTimeout(function () {
    tooltip.style.visibility = "hidden";
  }, 550);
}

const slider = document.querySelector("#password-length");
const lengthDisplay = document.querySelector("#length-display");

slider.oninput = function () {
  lengthDisplay.textContent = this.value;
  passwordLenght = this.value;
};
