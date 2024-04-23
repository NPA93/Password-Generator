const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const specialCharacters = "~`!@#$%^&*()-_+=[]{}|:;<>.,?/".split("");

let textEl = document.querySelector("#password-text");
let currentPasswordLenght = 15;

function generatePassword() {
  let allowedCharacters = [];

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
  for (let i = 0; i < currentPasswordLenght; i++) {
    let randomNumber = Math.floor(Math.random() * allowedCharacters.length);
    textEl.textContent += allowedCharacters[randomNumber];
  }

  document.querySelector("#copy-icon").classList.add("enable");

  evaluatePassword(textEl.textContent);
}

function copy() {
  let passwordCopy = document.querySelector("#password-text").textContent;

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
  currentPasswordLenght = this.value;
};

function evaluatePassword(password) {
  const strengthIndicator = document.querySelector("#password-strength");

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const size = password.length;

  if (size < 8 || (size >= 8 && (!hasUpper && !hasLower))) {
    strengthIndicator.textContent = "Even a Stormtrooper could hit this target.";
  // } else if (size >= 8 && size <= 11 && ((hasUpper || hasLower) && hasNumbers && !hasSpecial)) {
  //   strengthIndicator.textContent = "Moderate";

  } else if (size >= 12 && size <= 13 && (hasUpper && hasLower && hasNumbers && hasSpecial)) {
    strengthIndicator.textContent = "This password is the One Ring of passwords — hard to find and harder to break.";

  } else if (size >= 14 && (hasUpper && hasLower && hasNumbers && hasSpecial)) {
    strengthIndicator.textContent = "As unbreakable as adamantium.";

  } else {
    strengthIndicator.textContent = "Just 'Moderate'—meh, it's okay.";

}
}
